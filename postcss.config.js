module.exports = (ctx) => ({
  parser: ctx.file.extname === '.sss' ? ctx.options.parser : false,
  map: ctx.options.map,
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      selectorBlackList: [],
      replace: false,
      mediaQuery: false,
      minPixelValue: 0,
      propWhiteList: [
        'font',
        'font-size',
        'line-height',
        'letter-spacing',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'width',
        'height',
        'border-radius',
        'letter-spacing'
      ]
    },
    autoprefixer: {
      browsers: [
        '> 2%',
        'last 2 versions',
        'ie >= 7'
      ]
    }
  }
})
