// shamelessly adapted from https://www.learnwithjason.dev/blog/auto-generate-social-image/

const getShareImage = ({
  title,
  date,
  cloudName,
  imagePublicID,
  cloudinaryUrlBase = 'https://res.cloudinary.com',
  version = null,
  titleFont = 'arial',
  dateFont = 'consolas',
  color = 'ffffff',
  imageWidth = 1200,
  imageHeight = 600,
  titleFontSize = 64,
  dateFontSize = 36,
  textAreaWidth = 984,
  textLeftOffset = 108,
  titleTopOffset = 87,
  dateBottomOffset = 57,
}) => {
  // configure social media image dimensions, quality, and format
  const imageConfig = [`w_${imageWidth}`, `h_${imageHeight}`, 'c_fill', 'q_auto', 'f_auto'].join(
    ','
  );
  // configure the title text
  const titleConfig = [
    `w_${textAreaWidth}`,
    'c_fit',
    `co_rgb:${color}`,
    'g_north_west',
    `x_${textLeftOffset}`,
    `y_${titleTopOffset}`,
    `l_text:${titleFont}_${titleFontSize}_bold:${encodeURIComponent(title)}`,
  ].join(',');
  // configure the tagline text
  const dateConfig = [
    `w_${textAreaWidth}`,
    'c_fit',
    `co_rgb:${color}`,
    'g_south_west',
    `x_${textLeftOffset}`,
    `y_${dateBottomOffset}`,
    `l_text:${dateFont}_${dateFontSize}:${encodeURIComponent(date)}`,
  ].join(',');

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    cloudinaryUrlBase,
    cloudName,
    'image',
    'upload',
    imageConfig,
    titleConfig,
    date && dateConfig,
    version,
    imagePublicID,
  ];

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean);

  // join all the parts into a valid URL to the generated image
  return validParts.join('/');
};

// https://res.cloudinary.com/djeivq7td/image/upload/v1580215866/card.png

// const img = getShareImage({
//   title: 'How remote work changed me',
//   titleFont: 'Raleway',
//   date: 'July',
//   dateFont: 'Inconsolata',
//   cloudName: 'djeivq7td',
//   imagePublicID: 'card',
// });

export default ({ title, dateString = null }) =>
  getShareImage({
    title: title,
    titleFont: 'Raleway',
    date: dateString,
    dateFont: 'Inconsolata',
    cloudName: 'djeivq7td',
    imagePublicID: 'card',
  });
