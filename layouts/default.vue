<template>
  <v-app light>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon color="pink" @click="shareMessage">
        <v-icon>mdi-share</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content fluid>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '超限定マップ'
    }
  },
  mounted() {
    this.initVconsole()
  },
  methods: {
    initVconsole() {
      // vConsoleをイニシャライズ
      /* eslint no-unused-vars: 0 */
      window.vConsole = new window.VConsole({
        defaultPlugins: ['system', 'network', 'element', 'storage'],
        maxLogNumber: 1000,
        onReady() {
          console.log('vConsole is ready.')
        },
        onClearLog() {
          console.log('on clearLog')
        }
      })
    },
    initLiff() {
      // eslint-disable-next-line no-undef
      liff
        .init({
          liffId: '1654002474-d1eY563w'
        })
        .then(() => {
          // Start to use liff's api
          // this.$store.commit('setLiff', liff)
        })
        .catch(err => {
          // Error happens during initialization
          console.log(err.code, err.message)
        })
    },
    shareMessage() {
      // eslint-disable-next-line no-undef
      liff
        .shareTargetPicker([
          {
            type: 'text',
            text: 'this is a test'
          }
        ])
        .then(alert('ShareTargetPicker was launched'))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch(function(res) {
          alert('Failed to launch ShareTargetPicker')
        })
    }
  }
}
</script>
