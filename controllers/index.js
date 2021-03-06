'use strict';

const cheerio = require('cheerio');
const { formatDate, cities, categories } = require('../utils');

module.exports = async function (fastify) {
  const allJobsHandler = async function (req, reply) {
    const { ps, pn, ct, ca } = req.query;
    // ps: page_size of value [10, 25, 50] only, other values will default to 10
    const PAGE_SIZE = [10, 25, 50].find(item => item == ps) ? ps : 10;

    // pn: page_number will default to 1 when its value bigger than total_pages
    const PAGE_NUM = pn ? pn : 1;

    // ct: city_id of value [1, 2, ..., 81] only, other values will default to -1
    const CITY = cities.find(item => item == ct) ? ct : -1;

    // ca: job_category of [0, 1, 2,..., 21] only, other values will default to 0
    const CATEGORY = categories.find(category => category.id === +ca)
      ? categories.find(category => category.id === +ca).name
      : categories[0].name;

    const API_URL = `https://www.adwhit.com/${encodeURIComponent(CATEGORY)}/${CITY}/0/${PAGE_NUM}/${PAGE_SIZE}`;

    try {
      const data = [];
      const html = (await fastify.axios.get(API_URL)).data;
      const $ = cheerio.load(html);

      const TOTAL_JOBS = $('#resultCount', html)
        .text()
        .trim()
        .replace(/,/g, '');
      const TOTAL_PAGES = Math.ceil(TOTAL_JOBS / PAGE_SIZE);

      $('.listingBlock', html).each(function () {
        const title = $(this)
          .children('.listingTitle')
          .text()
          .slice(0, -12)
          .trim();
        const link = $(this).children('a').attr('href');
        const views = $(this)
          .children('.listingFooter')
          .children('div:nth-child(3)')
          .text()
          .trim();
        const location = $(this)
          .children('.listingFooter')
          .children('div:nth-child(9)')
          .text()
          .trim();
        const createdAt = $(this)
          .children('.listingFooter')
          .children('div:nth-child(1)')
          .text()
          .replace('اليوم', formatDate(new Date()))
          .replace('الأمس', formatDate(new Date(Date.now() - 864e5)))
          .trim();

        data.push({
          title,
          link: 'https://www.adwhit.com' + link,
          views,
          location,
          createdAt,
        });
      });

      return {
        count: TOTAL_JOBS,
        items_per_page: PAGE_SIZE,
        current_page: PAGE_NUM,
        last_page: TOTAL_PAGES,
        rows: data,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    allJobsHandler,
  };
};
