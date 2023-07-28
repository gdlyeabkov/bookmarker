import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - diary',
    title: 'diary',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://www.diigo.com/asset/images/extension_icon.png' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  layouts: {
    start: '~/layouts/start.vue',
    empty: '~/layouts/empty.vue',
  },

  auth: {
    strategies: {
      microsoft: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize',
          token: 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token',
          userInfo: 'https://graph.microsoft.com/v1.0/me'
        },
        token: {
          maxAge: 3600
        },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: 'offline',
        clientId: '',
        clientSecret: '',
        scope: ['user.read'],
        tenant: '{tenant}'
      },
      google: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          token: 'https://accounts.google.com/o/oauth2/token',
          userInfo: 'https://www.googleapis.com/oauth2/v1/userinfo'
        },
        token: {
          maxAge: 3600
        },
        responseType: 'code',
        codeChallengeMethod: '',
        accessType: 'offline',
        clientId: '232784374419-emlqb07ueihkeemnjqtj0jkgpnjqkkuu.apps.googleusercontent.com',
        clientSecret: '',
        scope: ['profile', 'email'],
        redirect_uri: 'http://localhost:3000/library'
      },
      facebook: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://www.facebook.com/dialog/oauth',
          token: 'https://graph.facebook.com/v11.0/oauth/access_token',
          userInfo: 'https://graph.facebook.com/v11.0/me?fields=about,name,picture{url}'
        },
        token: {
          maxAge: 3600
        },
        responseType: 'code',
        clientId: '',
        clientSecret: '',
        scope: ['public_profile', 'email']
      }
    }
  }

}
