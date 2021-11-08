'use strict';

const fp = require('fastify-plugin');

/**
 * This plugins adds important security headers for Fastify
 *
 * @see https://github.com/jsumners/fastify-no-icon
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-no-icon'), {
    errorHandler: false,
  });
});
