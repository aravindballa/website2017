export default function (episode, title, dateString, durationString) {
  return `https://res.cloudinary.com/djeivq7td/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_857,c_fit,co_rgb:000000,g_north_west,x_108,y_87,l_text:Raleway_72_bold:
      ${encodeURI(
        episode +
          '. ' +
          title
            .replace('.', ' -')
            .replace('?', '')
            .replace(
              /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
              ''
            )
            .trim()
      )}/w_857,c_fit,co_rgb:000000,g_south_west,x_140,y_180,l_text:Raleway_36:${dateString.replace(
    ',',
    ''
  )}/w_857,c_fit,co_rgb:000000,g_south_west,x_140,y_120,l_text:Raleway_36:${durationString}/lc-og`;
}
