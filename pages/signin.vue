<template>
  <v-container>
    <v-row class="my-5">
      <v-col>
        <img
          src="https://www.diigo.com/images/v6/diigologolarge.png"
          width="250" />
      </v-col>
      <v-divider
        class="mx-5"
        vertical />
      <v-col>
        <v-form ref="form">
          <p>Войти в diigo</p>
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
              <p>Забыли пароль?</p>
            </v-col>
          </v-row>
          <p>Войдите через другие аккаунты</p>
          <v-btn
            class="my-2"
            width="100%"
            @click="signIn('google')">Google</v-btn>
          <v-btn
            class="my-2"
            width="100%"
            @click="signIn('facebook')">Facebook</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <p class="text-center">У вас еще нет Diggo аккаунта? <nuxt-link to="signup" class="clickable blue--text">Создайте Diigo аккаунт сейчас</nuxt-link></p>
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
    return {
      email,
      pass,
      emailRules,
      passwordRules
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
                // sessionStorage.setItem('user', user.id)
                localStorage.setItem('token', response.token)
                // this.$router.push({ name: 'library', query: { id: user.id } })
                this.$router.push({ name: 'library' })
              }
            } else {
              alert('User with provided credentials is not found.')
            }
          } catch (e) {
            alert('error')
          }
        }
      }
    }
  }
}
</script>
<style>
</style>
