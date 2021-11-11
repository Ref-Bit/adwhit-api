'use strict';

const fp = require('fastify-plugin');

/**
 * This plugin for serving Swagger/OpenAPI documentation for Fastify, supporting dynamic generation.
 *
 * @see https://github.com/fastify/fastify-swgger
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-swagger'), {
    staticCSP: true,
    exposeRoute: true,
    routePrefix: '/api/v1/docs',
    swagger: {
      info: {
        title: 'Adwhit-API',
        description:
          'Adwhit API built for adwit jobs section with web scraper technology. Check [Adwhit](https://www.adwhit.com) for reference.',
        version: '1.0',
        contact: {
          name: 'API Support',
          url: 'http://www.github.com/Ref-Bit',
          email: 'refaatbitar@gmail.com',
        },
      },
      basePath: '/api/v1',
      schemes: ['http'],
    },
  });
});
