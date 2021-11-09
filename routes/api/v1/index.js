'use strict';

const Job = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    link: { type: 'string' },
    views: { type: 'number' },
    location: { type: 'string' },
    createdAt: { type: 'string' },
  },
};

const jobsOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          count: { type: 'number' },
          items_per_page: { type: 'number' },
          current_page: { type: 'number' },
          last_page: { type: 'number' },
          rows: {
            type: 'array',
            items: Job,
          },
        },
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

  fastify.get('/all-jobs', jobsOpts, controller.allJobsHandler);

  next();
};
