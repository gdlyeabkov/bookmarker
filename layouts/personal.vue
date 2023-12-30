<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid class="full-w non-pad">
        <Nuxt />
      </v-container>
    </v-main>
    <v-speed-dial
      :bottom="true"
      :right="true">
      <template v-slot:activator>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :offset="125"
          offset-y
          contained
          :z-index="'0'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="true"
              v-bind="attrs"
              v-on="on"
              color="gray darken-2"
              dark
              fab
              absolute
              right
              position="relative"
              target="cursor">
              <v-icon>mdi-chat</v-icon>
            </v-btn>
            <v-btn
              v-else
              v-bind="attrs"
              v-on="on"
              color="red darken-2"
              dark
              fab
              absolute
              right>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <v-card class="pa-5">
            <p class="text-subtitle-2">Отправьте нам сообщние</p>
            <p class="text-subtitle-1">Перейдите на премиум для получение быстрой поддержки</p>
            <v-text-field v-model="title" placeholder="Тема"  />
            <v-textarea v-model="msg" placeholder="Получить обратную связь или спросить помощь." />
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="black"
                class="white--text"
                variant="text"
                :disabled="!title.length || !msg.length"
                @click="send"
              >
                Отправить
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-menu>
      </template>
    </v-speed-dial>
    <Footer />
  </v-app>
</template>

<script>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  setup () {
    const menu = ref(false)
    const title = ref('')
    const msg = ref('')
    return {
      menu,
      title,
      msg
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    token () {
      return this.$store.state.token
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
    async send () {
      const data = new FormData()
      data.append('content', this.msg)
      data.append('subject', this.title)
      await this.$axios.$post('http://localhost:8000/api/feedback/', data, {
        headers: {
          Authorization: this.token,
          'Content-Type': 'multipart/form-data'
        }
      })
      this.menu = false
    }
  }
}
</script>
<style scoped>
  .full-w {
    width: 100%;
  }

  .non-pad {
   padding: 0px;
  }

  .clickable {
    cursor: pointer;
  }
</style>
