'use strict';

const fp = require('fastify-plugin');

/**
 * This plugins eliminates thrown errors for /favicon.ico requests.
 *
 * @see https://github.com/jsumners/fastify-no-icon
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-no-icon'), {
    errorHandler: false,
  });
});
