'use strict';

module.exports = async function (fastify) {
  const testHandler = async function (req, reply) {
    try {
      const { data } = await fastify.axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    testHandler,
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
