const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);

  const { name, last_name, email, data, tags = 'hackletter,website' } = body.payload;

  if (last_name) {
    return {
      statusCode: 400,
    };
  }

  const response = await fetch('https://api.mailbluster.com/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.MAILBLUSTER_TOKEN,
    },
    body: JSON.stringify({
      firstName: name,
      email,
      subscribed: true,
      tags: tags.split(',').map((tag) => tag.trim()),
      overrideExisting: true,
      meta: {
        referrer: data.referrer,
      },
    }),
  });

  if (response.status === 201) {
    let message = `New subscriber 💌: ${name} added to mailing list.`;
    if (tags.includes('next-notion')) {
      message = `😬 ${name} just subscribed to NextJS Notion course.`;
    }
    try {
      await fetch(
        `https://api.telegram.org/bot${
          process.env.TELEGRAM_API_KEY
        }/sendMessage?chat_id=506959518&text=${encodeURI(message)}`
      );
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: err }),
      };
    }
  }

  return {
    statusCode: 200,
  };
};
