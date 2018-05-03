'use strict'

const Hapi = require('hapi')
const Bunyan = require('bunyan')
const Good = require('good')
const Healthy = require('hapi-and-healthy')
const Auth = require('hapi-auth-basic')
const Self = require('./package')
const Env = process.env.NODE_ENV || 'DEV'
const Port = process.env.PORT || 5000
const OS = require('os')
const host = OS.hostname()

const Logger = Bunyan.createLogger({ name: 'bizdevops', level: 'trace' })

const Gitlab = require('./gitlab')

const server = Hapi.server({
  host: '0.0.0.0',
  port: Port
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

const validate = async (request, username, password, h) => {
  if (username === 'speaker' && password === 'Speaker Notes are cute *.*') {
    return { credentials: {id: 'speaker', name: 'JAX BDO Speaker'}, isValid: true }
  } else {
    return { credentials: {}, isValid: false }
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

const slides = async () => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'static',
        index: ['slides.html']
      }
    }
  })
}

const speaker = async () => {
  server.route({
    method: 'GET',
    path: '/plugin/notes/{param*}',
    config: {
      auth: {
        strategy: 'simple',
        mode: 'required'
      }
    },
    handler: {
      directory: {
        path: 'static/plugin/notes',
        index: ['index.html', 'notes.html']
      }
    }
  })
}

async function start () {
  try {
    await server.register(Auth)
    server.auth.strategy('simple', 'basic', { validate: validate, allowEmptyUsername: true, default: false })

    await rest()

    await server.register(require('inert'))
    await server.register({
      plugin: Good,
      options: options
    })

    await slides()
    await speaker()

    await server.register({
      plugin: Healthy,
      options: {
        path: '/api/health',
        id: host,
        env: Env,
        name: Self.name,
        version: Self.version
      }
    })

    await server.start()
  } catch (err) {
    server.log('error', err)
    console.log(err)
    process.exit(1)
  }

  server.log('info', host)
  server.log('info', server.info.uri)
  server.log('info', Self.name)
  server.log('info', Self.version)
};

start()
