'use strict';

const fp = require('fastify-plugin');

/**
 * This plugins add low overhead rate limiter for routes.
 *
 * @see https://github.com/fastify/fastify-rate-limit
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-rate-limit'), {
    errorResponseBuilder: function (req, context) {
      return {
        code: 429,
        error: 'Too Many Requests',
        message: `I only allow ${context.max} requests per ${context.after} to this endpoint. Try again soon.`,
        date: Date.now().toLocaleString(),
        expiresIn: context.ttl, // milliseconds
      };
    },
  });
});
