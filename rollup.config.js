import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: './src/assets/javascripts/application.js',
  dest: './dist/assets/javascripts/application.js',
  format: 'iife',
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          'es2015-rollup'
        ]
      ],
      plugins: [
        'external-helpers'
      ]
    }),
    uglify()
  ]
}
