'use strict'

const Hapi = require('hapi')
const Bunyan = require('bunyan')
const Good = require('good')

const Logger = Bunyan.createLogger({ name: 'bizdevops', level: 'trace' })

const Gitlab = require('./gitlab')

const server = Hapi.server({
  host: 'localhost',
  port: 8000
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
