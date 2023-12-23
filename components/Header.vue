<template>
  <v-app-bar
    elevation="0"
    fixed
    app
    color="cyan">
    <v-app-bar-title>
      <img
        src="@/assets/img/bookmarker_logo.png"
        width="75" />
    </v-app-bar-title>
    <v-btn class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('library')">Моя библиотека</v-btn>
    <v-btn v-if="false" class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('outliners')">Мои структуры</v-btn>
    <v-btn v-if="false" class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('groups')">Мои группы</v-btn>
    <v-btn v-if="false" class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('tools')">Инструменты</v-btn>
    <v-spacer />
    <v-btn class="text-capitalize mx-4 white--text" elevation="0" color="orange" :rounded="true" @click="switchScreen('plans')">Улучшить</v-btn>
    <v-avatar color="info" size="24">
      <v-img :src="avatar" @error="handleAcceptAvatarError" />
    </v-avatar>
    <v-btn class="text-capitalize header__profile-btn" color="transparent" elevation="0" :style="'text-transform: unset !important;'">{{getEmail}}</v-btn>
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="clickable" @click="switchScreen('public')">
          <v-list-item-title>Публичная библиотека</v-list-item-title>
        </v-list-item>
        <v-list-item class="clickable" @click="switchScreen('settings')">
          <v-list-item-title>Настройки</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="IS_COMMING_SOON" class="clickable" @click="switchScreen('support')">
          <v-list-item-title>Поддержка</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="IS_COMMING_SOON" class="clickable" @click="switchScreen('discover')">
          <v-list-item-title>Обнаружить</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="IS_COMMING_SOON" class="clickable" @click="switchScreen('help')">
          <v-list-item-title>Помощь</v-list-item-title>
        </v-list-item>
        <v-list-item class="clickable" @click="logout()">
          <v-list-item-title>Выйти</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { ref } from 'vue'
import { mapActions } from 'vuex'

export default {
  setup () {
    const IS_COMMING_SOON = ref(false)
    const avatar = ref(null)
    return {
      IS_COMMING_SOON,
      avatar
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    getEmail () {
      if (this.user) {
        return this.user.email
      }
      return ''
    }
  },
  async mounted () {
    // TODO: distribute for other pages
    await this.authGuard()
    if (this.user) {
      this.name = this.user.name
      this.email = this.user.email
      this.password = this.user.mask_pass
      this.avatar = `http://localhost:8000/user/avatar/?id=${this.user.id}`
    }
  },
  methods: {
    ...mapActions([
      'setUser',
      'setToken'
    ]),
    handleAcceptAvatarError () {
      this.avatar = 'https://resources.diigo.com/images/avatar/user/nickfish2020_96.jpg?rand=863'
    },
    async authGuard () {
      try {
        if (!this.token) {
          const token = localStorage.getItem('token')
          if (token) {
            await this.setToken(token)
            const response = await this.$axios.$get('http://localhost:8000/api/user/token', {
              headers: {
                Authorization: token
              }
            })
            const user = response.user
            if (user) {
              await this.setUser(user)
            } else {
              this.$router.push({ path: '/start' })
            }
          } else {
            this.$router.push({ path: '/start' })
          }
        }
      } catch (e) {
        /*
         * TODO
         * show error
         */
      }
    },
    switchScreen (screen) {
      this.$router.push(screen)
    },
    logout () {
      this.switchScreen('start')
    }
  }
}
</script>

<style>
>>> .v-btn {
  text-transform: unset !important;
}
</style>
