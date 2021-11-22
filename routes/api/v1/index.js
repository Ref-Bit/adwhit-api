'use strict';

const { categories } = require('../../../utils');

const JobSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Job title',
      example: 'مطلوب مسوق/ة لشركة اعلامية في اسطنبول',
    },
    link: {
      type: 'string',
      description: 'Job link on Adwhit website',
      example:
        'https://www.adwhit.com/مطلوب-مسوق-ة-لشركة-اعلامية-في-اسطنبول-31193',
    },
    views: { type: 'number', description: 'Number of job views', example: 190 },
    location: {
      type: 'string',
      description: 'Job location',
      example: 'İstanbul',
    },
    createdAt: {
      type: 'string',
      description: 'Job posted datetime',
      example: '22/11/2021 15:51',
    },
  },
};

const rootOpts = {
  schema: {
    tags: [
      {
        name: 'Health',
      },
    ],
    summary: 'Returns string.',
    description: 'Check server health.',
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
  config: {
    rateLimit: {
      max: 5,
      timeWindow: '1 minute',
    },
  },
  schema: {
    tags: [
      {
        name: 'Jobs',
      },
    ],
    summary: 'Returns a array of objects.',
    description:
      'Data scraped from all jobs section. Limited to *10 requests per minute*.',
    path: '/jobs',
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
          description: `Filter by job category. It must be one of the categories below. *In case of other values or no category was specified, it will default to 0*.\n\t
              { id: 0, category: 'جميع-الوظائف' },\n\t
              { id: 1, category: 'الوظائف-الهندسية' },\n\t
              { id: 2, category: 'الوظائف-الطبية' },\n\t
              { id: 3, category: 'وظائف-قانونية-واستشارية' },\n\t
              { id: 4, category: 'وظائف-الترجمة' },\n\t
              { id: 5, category: 'وظائف-المطاعم' },\n\t
              { id: 6, category: 'وظائف-الفنادق' },\n\t
              { id: 7, category: 'وظائف-البناء' },\n\t
              { id: 8, category: 'وظائف-الرعاية-الصحية' },\n\t
              { id: 9, category: 'وظائف-التكنولوجيا' },\n\t
              { id: 10, category: 'وظائف-التدريس' },\n\t
              { id: 11, category: 'وظائف-خدمة-المنازل-والمكاتب' },\n\t
              { id: 12, category: 'وظائف-العقارات' },\n\t
              { id: 13, category: 'وظائف-الشحن-والنقل' },\n\t
              { id: 14, category: 'وظائف-متفرقة' },\n\t
              { id: 15, category: 'وظائف-المحاسبة' },\n\t
              { id: 16, category: 'وظائف-المهن-الصناعية-و-الحرفية' },\n\t
              { id: 17, category: 'وظائف-السكرتارية' },\n\t
              { id: 18, category: 'وظائف-السياحة' },\n\t
              { id: 19, category: 'وظائف-الاعلام' },\n\t
              { id: 20, category: 'وظائف-المبيعات-والتسويق' },\n\t
              { id: 21, category: 'وظائف-الغزل-و-النسيج' },\n\t
           `,
          enum: [...categories.map(item => item.id)],
          default: 0,
        },
      },
    },
    response: {
      200: {
        headers: {
          'X-Rate-Limit-Limit': {
            description: 'The number of allowed requests in the current period',
            type: 'integer',
          },
          'X-Rate-Limit-Remaining': {
            description:
              'The number of remaining requests in the current period',
            type: 'integer',
          },
          'X-Rate-Limit-Reset': {
            description: 'The number of seconds left in the current period',
            type: 'integer',
          },
        },
        type: 'object',
        properties: {
          count: {
            type: 'number',
            description: 'Total number of posted all jobs',
            example: 20864,
          },
          items_per_page: {
            type: 'number',
            description: 'Number of jobs per page',
            example: 10,
          },
          current_page: {
            type: 'number',
            description: 'Current jobs page',
            example: 1,
          },
          last_page: {
            type: 'number',
            description: 'Last jobs page',
            example: 2021,
          },
          rows: {
            $ref: 'Job#',
          },
        },
        description: 'OK',
      },
      429: {
        type: 'object',
        properties: {
          code: { type: 'number' },
          error: { type: 'string' },
          message: { type: 'string' },
          date: { type: 'string' },
          expiresIn: { type: 'number' },
        },
        description: 'Too many requests',
      },
    },
  },
};

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
module.exports = async function (fastify, opts, next) {
  fastify.addSchema({
    $id: 'Job',
    type: 'array',
    items: { ...JobSchema },
  });

  const controller = await require('../../../controllers')(fastify);

  fastify.get('/', rootOpts);

  fastify.get('/jobs', jobsOpts, controller.allJobsHandler);

  next();
};
