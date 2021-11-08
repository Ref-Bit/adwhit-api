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
      return 'Server is live...🚀';
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = async function (fastify, opts) {
  fastify.get('/', rootOpts);
};
