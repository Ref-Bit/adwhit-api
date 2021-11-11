'use strict';

const rootOpts = {
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
  handler: async function (req, reply) {
    try {
      reply.code(303).redirect('/api/v1');
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = async function (fastify, opts) {
  fastify.get('/', rootOpts);
};
