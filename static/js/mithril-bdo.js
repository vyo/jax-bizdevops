/* global m */
'use strict'

const svg = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" id="status_success" width="100%" height="100%">
  <g fill-rule="evenodd">
  <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z">
  </path>
  <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF">
  </path>
  <path d="M6.278 7.697L5.045 6.464a.296.296 0 0 0-.42-.002l-.613.614a.298.298 0 0 0 .002.42l1.91 1.909a.5.5 0 0 0 .703.005l.265-.265L9.997 6.04a.291.291 0 0 0-.009-.408l-.614-.614a.29.29 0 0 0-.408-.009L6.278 7.697z">
  </path>
  </g>
  </svg>
  `,
  running: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" id="status_running" width="100%" height="100%">
  <g fill-rule="evenodd">
  <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z">
  </path>
  <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF">
  </path>
  <path d="M7 3c2.2 0 4 1.8 4 4s-1.8 4-4 4c-1.3 0-2.5-.7-3.3-1.7L7 7V3">
  </path>
  </g>
  </svg>
  `,
  failed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" id="status_failed" width="100%" height="100%">
  <g fill-rule="evenodd">
  <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z">
  </path>
  <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF">
  </path>
  <path d="M7 5.969L5.599 4.568a.29.29 0 0 0-.413.004l-.614.614a.294.294 0 0 0-.004.413L5.968 7l-1.4 1.401a.29.29 0 0 0 .004.413l.614.614c.113.114.3.117.413.004L7 8.032l1.401 1.4a.29.29 0 0 0 .413-.004l.614-.614a.294.294 0 0 0 .004-.413L8.032 7l1.4-1.401a.29.29 0 0 0-.004-.413l-.614-.614a.294.294 0 0 0-.413-.004L7 5.968z">
  </path>
  </g>
  </svg>
  `,
  skipped: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" id="status_skipped" width="100%" height="100%">
  <path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14z">
  </path>
  <path d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12z" fill="#FFF">
  </path>
  <path d="M6.415 7.04L4.579 5.203a.295.295 0 0 1 .004-.416l.349-.349a.29.29 0 0 1 .416-.004l2.214 2.214a.289.289 0 0 1 .019.021l.132.133c.11.11.108.291 0 .398L5.341 9.573a.282.282 0 0 1-.398 0l-.331-.331a.285.285 0 0 1 0-.399L6.415 7.04zm2.54 0L7.119 5.203a.295.295 0 0 1 .004-.416l.349-.349a.29.29 0 0 1 .416-.004l2.214 2.214a.289.289 0 0 1 .019.021l.132.133c.11.11.108.291 0 .398L7.881 9.573a.282.282 0 0 1-.398 0l-.331-.331a.285.285 0 0 1 0-.399L8.955 7.04z">
  </path>
  </svg>`,
  canceled: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" id="status_canceled" width="100%" height="100%">
  <g fill-rule="evenodd">
  <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z">
  </path>
  <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF">
  </path>
  <path d="M5.2 3.8l4.9 4.9c.2.2.2.5 0 .7l-.7.7c-.2.2-.5.2-.7 0L3.8 5.2c-.2-.2-.2-.5 0-.7l.7-.7c.2-.2.5-.2.7 0">
  </path>
  </g>
  </svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" id="status_warning" width="100%" height="100%">
  <g fill-rule="evenodd">
  <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z">
  </path>
  <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF">
  </path>
  <path d="M6 3.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v4c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-4m0 6c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-1">
  </path>
  </g>
  </svg>`,
  manual: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" id="status_manual" width="100%" height="100%">
  <g fill-rule="evenodd">
  <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z">
  </path>
  <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF">
  </path>
  <path d="M10.5 7.63V6.37l-.787-.13c-.044-.175-.132-.349-.263-.61l.481-.652-.918-.913-.657.478a2.346 2.346 0 0 0-.612-.26L7.656 3.5H6.388l-.132.783c-.219.043-.394.13-.612.26l-.657-.478-.918.913.437.652c-.131.218-.175.392-.262.61l-.744.086v1.261l.787.13c.044.218.132.392.263.61l-.438.651.92.913.655-.434c.175.086.394.173.613.26l.131.783h1.313l.131-.783c.219-.043.394-.13.613-.26l.656.478.918-.913-.48-.652c.13-.218.218-.435.262-.61l.656-.13zM7 8.283a1.285 1.285 0 0 1-1.313-1.305c0-.739.57-1.304 1.313-1.304.744 0 1.313.565 1.313 1.304 0 .74-.57 1.305-1.313 1.305z">
  </path>
  </g>
  </svg>`,
  created: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" id="status_created" width="100%" height="100%">
  <g fill-rule="evenodd">
  <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z">
  </path>
  <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF">
  </path>
  <circle cx="7" cy="7" r="3.25">
  </circle>
  </g>
  </svg>`,
  pending: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" id="status_pending" width="100%" height="100%">
  <g fill-rule="evenodd">
  <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z">
  </path>
  <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF">
  </path>
  <path d="M4.7 5.3c0-.2.1-.3.3-.3h.9c.2 0 .3.1.3.3v3.4c0 .2-.1.3-.3.3H5c-.2 0-.3-.1-.3-.3V5.3m3 0c0-.2.1-.3.3-.3h.9c.2 0 .3.1.3.3v3.4c0 .2-.1.3-.3.3H8c-.2 0-.3-.1-.3-.3V5.3">
  </path>
  </g>
  </svg>`
}

const Pipelines = {
  list: [],
  load: async () => {
    let pipelines = await m.request({
      method: 'GET',
      url: '/api/pipelines',
      data: {
        detailed: true,
        limit: 1
      }
    })

    if (pipelines) {
      pipelines = pipelines.map(pipe => {
        const stages = []
        const stageMap = {}
        pipe.stages.forEach(it => {
          stageMap[it] = stages.length
          stages.push([])
        })

        pipe.jobs.forEach(job => {
          const previousJobIndex = stages[stageMap[job.stage]].findIndex(it => it.name === job.name)
          if (previousJobIndex !== -1) {
            stages[stageMap[job.stage]][previousJobIndex] = job
          } else {
            stages[stageMap[job.stage]].push(job)
          }
        })

        return stages.filter(it => it).map(it => ({name: it[0].stage, jobs: it}))
      })
      Pipelines.list = pipelines || Pipelines.list
    }
    console.log(Pipelines.list)
  }
}

const gitlab = document.getElementById('gitlab')
const slides = document.getElementById('slides')
let controls = document.getElementsByClassName('controls')[0]

const pipelines = {
  oninit: Pipelines.load,
  view: () => m('div', {class: 'pipelines'},
    Pipelines.list.map(pipe => m('ul', {class: 'pipeline'},
      pipe.map(stage => m('li', {class: 'stage'},
        m('div', {class: 'title'}, stage.name),
        m('ul', {class: 'jobs'},
          stage.jobs.map(job => m('li', {class: 'job'},
            m('div', {class: 'connector-left-blend connector-left-curved-blend connector-right-blend connector-right-curved-blend'}),
            m('div', {class: 'pipeline-step connector-left connector-left-curved connector-right connector-right-curved'},
              m('div', {class: `icon ${job.status}`}, m.trust(svg[job.status])),
              m('div', {class: 'spacing'}),
              m('div', {class: 'text'},
                m('span', job.name)
              )
            )
          )),
          m('li', {class: 'job summary'},
            m('div', {class: ''}),
            m('div', {class: 'pipeline-step'},
              stage.jobs.map(job => m('div', {class: `icon ${job.status}`}, m.trust(svg[job.status])))
            )
          )
        )
      ))
    ))
  )
}
m.mount(gitlab, pipelines)
// const updatePipelines = setInterval(async () => {

const toggleFullScreenMode = (on) => {
  if (on) {
    if (!slides.className.includes('fullscreen')) {
      slides.className = `${slides.className} fullscreen`
    }
  } else {
    slides.className = slides.className.replace(/ ?fullscreen/, '')
  }
  // slides.className = slides.className.includes('fullscreen') ? slides.className.replace(/ ?fullscreen/, '') : `${slides.className} fullscreen`
}

setInterval(async () => {
  await Pipelines.load()
  m.render(pipelines)
}, 2000)
setInterval(() => {
  if (window.innerHeight === window.screen.height) {
    toggleFullScreenMode(true)
  } else {
    toggleFullScreenMode(false)
  }
}, 500)

const toggleGitlabView = () => {
  gitlab.className = gitlab.className.includes('minimal') ? gitlab.className.replace(/ ?minimal/, '') : `${gitlab.className} minimal`
  slides.className = slides.className.includes('minimal') ? slides.className.replace(/ ?minimal/, '') : `${slides.className} minimal`
  if (controls) {
    controls.className = controls.className.includes('minimal') ? controls.className.replace(/ ?minimal/, '') : `${controls.className} minimal`
  } else {
    controls = document.getElementsByClassName('controls')[0]
  }
}

toggleGitlabView()

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 70) {
    toggleFullScreenMode(true)
  }
}, true)
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    toggleFullScreenMode(false)
  }
}, true)

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 71) {
    toggleGitlabView()
  }
}, true)
// setTimeout(() => clearInterval(updatePipelines), 1000)
