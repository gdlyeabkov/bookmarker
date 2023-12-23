<template>
  <v-container class="sign-in-container">
    <v-row class="my-5 sign-in-container-row">
      <v-col>
        <img
          src="@/assets/img/bookmarker_logo.png"
          width="250" />
      </v-col>
      <v-divider
        class="mx-5"
        vertical />
      <v-col>
        <v-form ref="form">
          <p>Войти в bookmarker</p>
          <v-text-field
            :rules="emailRules"
            v-model="email"
            placeholder="Имя пользователя или E-mail" />
          <v-text-field
            :rules="passwordRules"
            type="password"
            v-model="pass"
            placeholder="Пароль" />
          <v-row>
            <v-col>
              <v-btn
                color="blue"
                class="white--text"
                @click="signIn()">Войти</v-btn>
            </v-col>
            <v-col>
              <nuxt-link to="/start">Забыли пароль?</nuxt-link>
            </v-col>
          </v-row>
          <div v-if="IS_COMMING_SOON">
            <p>Войдите через другие аккаунты</p>
            <v-btn
              class="my-2"
              width="100%"
              @click="signIn('google')">Google</v-btn>
            <v-btn
              class="my-2"
              width="100%"
              @click="signIn('facebook')">Facebook</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <p class="text-center">У вас еще нет Bookmarker аккаунта? <nuxt-link to="signup" class="clickable blue--text">Создайте Bookmarker аккаунт сейчас</nuxt-link></p>
  </v-container>
</template>
<script>
import { ref } from 'vue'
import { mapActions } from 'vuex'
export default {
  layout: 'empty',
  setup () {
    const email = ref('')
    const pass = ref('')
    const emailRules = ref([
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail введен не корректно'
    ])
    const passwordRules = ref([
      v => /^.........*$/.test(v) || 'Пароль введен не корректно'
    ])
    const IS_COMMING_SOON = ref(false)
    return {
      email,
      pass,
      emailRules,
      passwordRules,
      IS_COMMING_SOON
    }
  },
  methods: {
    ...mapActions([
      'setUser',
      'setToken'
    ]),
    async signIn (service = null) {
      if (service) {
        this.$auth.loginWith('google')
      } else {
        // TODO
        const form = this.$refs.form
        const isValid = form.validate()
        if (isValid) {
          const data = new FormData()
          data.append('email', this.email)
          data.append('pass', this.pass)
          try {
            const response = await this.$axios.$post('http://localhost:8000/api/user/login', data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            console.log(response)
            const user = response.user
            const token = response.token
            if (user) {
              if (user.id > -1) {
                await this.setUser(user)
                await this.setToken(token)
                localStorage.setItem('token', response.token)
                this.$router.push({ name: 'library' })
              }
            } else {
              alert('Пользователь с предоставленными учетными данными не найден.')
            }
          } catch (e) {
            alert('Произошла ошибка')
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.sign-in-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sign-in-container-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
