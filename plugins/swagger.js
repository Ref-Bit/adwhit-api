'use strict';

const fp = require('fastify-plugin');

/**
 * This plugin for serving Swagger/OpenAPI documentation for Fastify, supporting dynamic generation.
 *
 * @see https://github.com/fastify/fastify-swagger
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-swagger'), {
    staticCSP: true,
    exposeRoute: true,
    routePrefix: '/api/v1/docs',
    openapi: {
      info: {
        title: 'Adwhit API',
        description:
          'Adwhit API built for adwit jobs section with web scraper technology. Check [Adwhit](https://www.adwhit.com) for reference.',
        version: '1.0',
        contact: {
          name: 'API Support',
          url: 'http://www.github.com/Ref-Bit',
          email: 'refaatbitar@gmail.com',
        },
      },
      servers: [
        {
          url: 'http://127.0.0.1:5000/api/v1',
          description: 'Development Server',
        },
        {
          url: 'https://adwhit-api.herokuapp.com/api/v1',
          description: 'Production Server',
        },
      ],
    },
  });
});
