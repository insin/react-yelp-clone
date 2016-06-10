var path = require('path')

var isDev = process.env.NODE_ENV === 'development'
var isTest = process.env.NODE_ENV === 'test'

var config = {
  type: 'react-app',
  babel: {
    stage: 0,
    loose: 'all'
  },
  webpack: {
    define: {
      __GAPI_KEY__: JSON.stringify('YOURAPIKEY')
    },
    html: {
      mountId: 'root',
      title: 'yelp-clone from fullstackreact.com (with nwb)'
    },
    loaders: {
      css: {
        modules: true,
        localIdentName: (isDev ? '[path][name]__[local]__' : '') + '[hash:base64:5]'
      }
    },
    postcss: [
      require('precss'),
      require('autoprefixer'),
      require('cssnano')
    ],
    extra: {
      resolve: {
        alias: {
          containers: path.resolve('src/containers'),
          components: path.resolve('src/components'),
          utils: path.resolve('src/utils'),
          styles: path.resolve('src/styles')
        }
      }
    }
  }
}

if (isTest) {
  // Enable webpack compatibility tweaks
  config.webpack.compat = {
    enzyme: true,
    sinon: true
  }

  // Tweak Karma config
  config.karma = {
    tests: 'tests.webpack.js',
    plugins: [
      require('karma-chai'),
      require('karma-spec-reporter')
    ],
    frameworks: ['mocha', 'chai'],
    reporters: ['spec']
  }
}

module.exports = config
