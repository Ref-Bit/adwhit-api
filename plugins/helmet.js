'use strict';

const fp = require('fastify-plugin');

/**
 * This plugins adds important security headers for Fastify
 *
 * @see https://github.com/fastify/fastify-helmet
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-helmet'), {
    errorHandler: false,
  });
});
