'use strict'

// const Promise =  require('bluebird')
const Request = require('request-promise')

const projectID = process.env['BDO_PROJECT_ID'] || '4'
const projectGroup = process.env['BDO_PROJECT_GROUP'] || 'jax'
const projectName = process.env['BDO_PROJECT_NAME'] || 'bizdevops'

const APIBaseURI = 'https://gitlab.henningp.de/api/v4'
const DeployBoardURI = `https://gitlab.henningp.de/${projectGroup}/${projectName}/environments.json`

const Options = {
  headers: {
    'Private-Token': process.env['BDO_ACCESS_TOKEN'] || 'pi885N9dt3XrmuBaLGxs'
  },
  json: true
}

const Deployments = async () => {
  const environmentsRaw = await Request(Object.assign({}, Options, {
    uri: DeployBoardURI,
    qs: {
      scope: 'available',
      page: 1
    }
  }))
  const environments = []
  environmentsRaw.environments.forEach(it => {
    const env = {}
    env.name = it.name
    env.state = it.latest.state
    env.url = it.latest.external_url
    env.pods = it.latest.rollout_status ? it.latest.rollout_status.instances.map(it => ({status: it.status, canary: it.track === 'canary', stable: it.stable})) : null

    environments.push(env)
  })

  return environments
}

const Pipelines = async (detailed = false, limit = 5) => {
  if (!limit || Number.isNaN(limit)) {
    limit = 5
  }

  let list = await Request(Object.assign({}, Options, {uri: `${APIBaseURI}/projects/${projectID}/pipelines`}))
  list = list.slice(0, limit)

  if (!detailed) {
    list.forEach((pipeline, index, array) => {
      // prune superfluous values
      array[index] = {
        id: pipeline.id,
        status: pipeline.status,
        ref: pipeline.ref
      }
    })

    return list
  } else {
    let detailedList = []
    list.forEach(it => detailedList.push(Request(Object.assign({}, Options, {uri: `${APIBaseURI}/projects/${projectID}/pipelines/${it.id}/jobs`}))))
    detailedList = await Promise.all(detailedList)
    detailedList = detailedList.map(pipeline => {
      const pipelineShort = list.shift()
      return {
        jobs: pipeline,
        id: pipelineShort.id,
        status: pipelineShort.status,
        ref: pipelineShort.ref
      }
    })

    detailedList.forEach((pipeline, index, array) => {
      const stages = []
      pipeline.jobs.forEach((job, index, array) => {
        // prune superfluous values
        array[index] = {
          id: job.id,
          status: job.status,
          stage: job.stage,
          name: job.name
        }

        // add new stage, if applicable
        if (!stages.includes(job.stage)) {
          stages.push(job.stage)
        }
      })
      array[index].stages = stages
    })

    return detailedList
  }
}

module.exports = {
  pipelines: Pipelines,
  deployments: Deployments
}
