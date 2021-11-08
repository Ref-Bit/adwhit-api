'use strict';

const fp = require('fastify-plugin');

/**
 * This plugins adds axios http client to your fastify instance
 *
 * @see https://github.com/davidedantonio/fastify-axios
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-axios'), {
    errorHandler: false,
  });
});
