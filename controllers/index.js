'use strict';

const cheerio = require('cheerio');
const { formatDate } = require('../utils');
const API_URL = 'https://www.adwhit.com';

module.exports = async function (fastify) {
  const allJobsHandler = async function (req, reply) {
    const { ps, pn } = req.query;
    // ps: page_size of value [10, 25, 50] only, other values will default to 10
    const PAGE_SIZE = [10, 25, 50].find(item => item == ps) ? ps : 10;
    const PAGE_NUM = pn ? pn : 1;

    try {
      const data = [];
      const html = (
        await fastify.axios.get(
          `${API_URL}/${encodeURIComponent(
            'جميع-الوظائف'
          )}/-1/0/${PAGE_NUM}/${PAGE_SIZE}`
        )
      ).data;
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
          link: API_URL + link,
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

/**
 * Get DYK, ITD, ITN data from HTML
 * @async
 * @param {query: {selector, splitter, matcher?}} req
 * @param {statusCode, Data} res
 * @returns {[{},{},{}...{}]}
 
exports.sectionsHandler = async (req, reply) => {
  try {
    return { text: 'Hello world' };
  } catch (error) {
    throw new Error(error);
  }
  /*
  const path = req.path.slice(1);
  const locale = req.query.locale.toLowerCase();
  const matcher = req.query.matcher; // To remove the dots from text

  try {
    if (!locale) {
      console.log('Wiki locale is required!');
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send('Wiki locale is required!');
    }

    const data = [];
    const html = (await axios.get(`https://${locale}.wikipedia.org`)).data;
    const $ = cheerio.load(html);

    $(locales[locale][path].selector, html).each(function () {
      const content = $(this)
        .children()
        .text()
        .split(locales[locale][path].splitter);
      content
        .filter(item => item)
        .map(item => {
          data.push({
            info: matcher ? item.replace(matcher, '').trim() : item,
          });
        });
    });
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('<h5>Something went wrong. Please try again later.</h5>');
  }
};
*/
