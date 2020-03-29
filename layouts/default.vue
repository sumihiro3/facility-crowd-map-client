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
      title: '超限定マップ（お試し版）'
    }
  },
  mounted() {
    if (process.env.useVconsole === 'YES') {
      this.initVconsole()
    }
    this.initLiff()
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
      window.liff
        .init({
          liffId: '1654002474-d1eY563w'
        })
        .then(() => {
          // Start to use liff's api
          // this.$store.commit('setLiff', liff)
          console.log('LIFF initialized!!')
        })
        .catch(err => {
          // Error happens during initialization
          console.log(err.code, err.message)
        })
    },
    shareMessage() {
      if (window.liff.isLoggedIn()) {
        // eslint-disable-next-line no-undef
        window.liff
          .shareTargetPicker([
            {
              type: 'flex',
              altText: '超限定マップ',
              contents: {
                type: 'bubble',
                hero: {
                  type: 'image',
                  url:
                    'https://2.bp.blogspot.com/-_xrqQ8WWe_g/XJB5e2_UFaI/AAAAAAABR_g/0zNnYPOnFsAd3AAIG7nDE-sOyFoyf59MwCLcBGAs/s400/website_heatmap.png',
                  size: 'full',
                  aspectRatio: '1:1',
                  aspectMode: 'cover'
                },
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '超限定マップ（お試し版）',
                      weight: 'bold',
                      size: 'xl'
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      margin: 'lg',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'box',
                          layout: 'vertical',
                          spacing: 'sm',
                          contents: [
                            {
                              type: 'text',
                              text:
                                '大阪府施設の混雑状況がリアルタイムでひと目で分かるサービスです',
                              wrap: true,
                              color: '#666666',
                              size: 'md',
                              flex: 5
                            },
                            {
                              type: 'text',
                              text:
                                '※注意：ハッカソン作品ですので本物のデータではありません',
                              size: 'md',
                              color: '#FF0000',
                              wrap: true,
                              weight: 'bold'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  spacing: 'sm',
                  contents: [
                    {
                      type: 'button',
                      style: 'link',
                      height: 'sm',
                      action: {
                        type: 'uri',
                        label: 'すぐに見る',
                        uri: 'https://liff.line.me/1654002474-d1eY563w'
                      }
                    },
                    {
                      type: 'spacer',
                      size: 'sm'
                    }
                  ],
                  flex: 0
                }
              }
            }
          ])
          .then(
            // launched!
            console.log('ShareTargetPicker was launched')
          )
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .catch(function(res) {
            console.error('Error!! at share target picker', res)
            alert('Failed to launch ShareTargetPicker')
          })
      } else {
        window.liff.login()
      }
    }
  }
}
</script>
