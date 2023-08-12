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
            placeholder="User name or email address" />
          <v-text-field
            :rules="passwordRules"
            type="password"
            v-model="pass"
            placeholder="Password" />
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
    <p class="text-center">У вас еще нет Diggo аккаунта? <span class="blue--text">Создайте Diigo аккаунт сейчас</span></p>
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
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ])
    const passwordRules = ref([
      v => /^.........*$/.test(v) || 'Password must be valid'
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
      'setUser'
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
            if (user) {
              if (user.id > -1) {
                this.setUser(user)
                this.$router.push({ name: 'library', query: { id: response.id } })
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
