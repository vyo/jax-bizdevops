'use strict'

const Hapi = require('hapi')
const Bunyan = require('bunyan')
const Good = require('good')
const Healthy = require('hapi-and-healthy')
const Self = require('./package')
const Env = process.env.NODE_ENV || 'DEV'

const Logger = Bunyan.createLogger({ name: 'bizdevops', level: 'trace' })

const Gitlab = require('./gitlab')

const server = Hapi.server({
  host: '0.0.0.0',
  port: 5000
})

const options = {
  reporters: {
    bunyan: [{
      module: 'good-bunyan',
      args: [
        { ops: '*', response: '*', log: '*', error: '*', request: '*' },
        {
          logger: Logger,
          levels: {
            ops: 'debug'
          },
          formatters: {
            response: (data) => {
              return 'Response for ' + data.path
            }
          }
        }
      ]
    }]
  }
}

const rest = async () => {
  server.route({
    method: 'GET',
    path: '/api/hello',
    handler: function (request, h) {
      return 'hello world'
    }
  })

  server.route({
    method: 'GET',
    path: '/api/pipelines',
    handler: function (request, h) {
      const detailedRaw = request.query.detailed
      const detailed = `${detailedRaw}`.toLowerCase() === 'true'

      const limitRaw = request.query.limit
      const limit = Number.parseInt(limitRaw)

      return Gitlab.pipelines(detailed, limit)
    }
  })

  server.route({
    method: 'GET',
    path: '/api/deployments',
    handler: function (request, h) {
      return Gitlab.deployments()
    }
  })
}

const files = async () => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'static',
        index: ['index.html', 'default.html']
      }
    }
  })
}

async function start () {
  try {
    await server.register(require('inert'))
    await server.register({
      plugin: Good,
      options: options
    })
    await server.register({
      plugin: Healthy,
      options: {
        path: '/api/health',
        env: Env,
        name: Self.name,
        version: Self.version
      }
    }
    )
    await rest()
    await files()
    await server.start()
  } catch (err) {
    server.log(err)
    process.exit(1)
  }

  server.log('Server running at:', server.info.uri)
};

start()
