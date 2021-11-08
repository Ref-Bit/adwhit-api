'use strict';

const Post = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    body: { type: 'string' },
    title: { type: 'string' },
    userId: { type: 'number' },
  },
};

const testOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Post,
      },
    },
  },
};

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
module.exports = async function (fastify, opts, next) {
  const controller = await require('../../../controllers')(fastify);
  fastify.get('/test', testOpts, controller.testHandler);
  next();
};
