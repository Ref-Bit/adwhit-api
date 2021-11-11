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

const rootOpts = {
  schema: {
    tags: [
      {
        name: 'Health',
      },
    ],
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

const jobsOpts = {
  schema: {
    tags: [
      {
        name: 'Jobs',
      },
    ],
    path: '/all-jobs',
    query: {
      type: 'object',
      properties: {
        ps: {
          type: 'number',
          description:
            'Items per page should be one of the values (10, 25, 50) only. *Other values will default to 10*.',
          default: 10,
        },
        pn: {
          type: 'number',
          description:
            'Page number will default to 1 when bigger than total pages.',
          default: 1,
        },
        ct: {
          type: 'number',
          description:
            'Filter by city. It must be the id number of turkish city (i.e. Istanbul: 34). *Other values will default to -1, where -1 means no city specified*.',
          default: -1,
        },
        ca: {
          type: 'number',
          description: `Filter by job category. It must be one of the categories below. *In case of other values or no category was specified, it will default to 0*.
              { id: 0, category: 'جميع-الوظائف' },
              { id: 1, category: 'الوظائف-الهندسية' },
              { id: 2, category: 'الوظائف-الطبية' },
              { id: 3, category: 'وظائف-قانونية-واستشارية' },
              { id: 4, category: 'الوظائف-الترجمة' },
              { id: 5, category: 'وظائف-المطاعم' },
              { id: 6, category: 'وظائف-الفنادق' },
              { id: 7, category: 'وظائف-البناء' },
              { id: 8, category: 'وظائف-الرعاية-الصحية' },
              { id: 9, category: 'وظائف-التكنولوجيا' },
              { id: 10, category: 'وظائف-التدريس' },
              { id: 11, category: 'وظائف-خدمة-المنازل-والمكاتب' },
              { id: 12, category: 'وظائف-العقارات' },
              { id: 13, category: 'وظائف-الشحن-والنقل' },
              { id: 14, category: 'وظائف-متفرقة' },
              { id: 15, category: 'وظائف-المحاسبة' },
              { id: 16, category: 'وظائف-المهن-الصناعية-و-الحرفية' },
              { id: 17, category: 'وظائف-السكرتارية' },
              { id: 18, category: 'وظائف-السياحة' },
              { id: 19, category: 'وظائف-الاعلام' },
              { id: 20, category: 'وظائف-المبيعات-والتسويق' },
              { id: 21, category: 'وظائف-الغزل-و-النسيج' },
           `,
          default: 0,
        },
      },
    },
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

  fastify.get('/', rootOpts);

  fastify.get('/jobs', jobsOpts, controller.allJobsHandler);

  next();
};
