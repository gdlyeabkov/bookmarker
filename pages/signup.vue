<template>
  <v-container>
    <v-row class="my-5 flex-column flex-md-row">
      <v-col class="d-flex d-md-block justify-center">
        <img
          src="@/assets/img/bookmarker_logo.png"
          width="250" />
      </v-col>
      <v-divider
        class="mx-5 d-none d-md-block"
        vertical />
      <v-col>
        <v-form ref="form">
          <p>Зарегистрироваться в bookmarker</p>
          <v-text-field
            :rules="emailRules"
            v-model="email"
            placeholder="Имя пользователя или E-mail" />
          <v-text-field
            :rules="passwordRules"
            type="password"
            v-model="pass"
            placeholder="Пароль" />
          <v-text-field
            :rules="passwordRules"
            type="password"
            v-model="confirmPass"
            placeholder="Подтвердите пароль" />
          <v-text-field
            type="text"
            v-model="name"
            placeholder="Имя" />
          <v-text-field
            type="number"
            v-model="age"
            min="0"
            placeholder="Возраст" />
          <v-select
            v-model="gender"
            :items="genderVariants"
            item-text="display"
            item-value="value"
            placeholder="Пол" />
          <v-row>
            <v-col>
              <v-btn
                color="blue"
                class="white--text"
                :disabled="!email.length || !pass.length || !confirmPass.length || !name.length || !age.length || !gender"
                @click="signUp()">Зарегистрироваться</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'
export default {
  layout: 'start',
  setup () {
    const email = ref('')
    const pass = ref('')
    const emailRules = ref([
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail введен не корректно'
    ])
    const passwordRules = ref([
      v => /^.........*$/.test(v) || 'Пароль введен не корректно'
    ])
    const confirmPass = ref('')
    const name = ref('')
    const age = ref('')
    const gender = ref('')
    const genderVariants = ref([
      {
        display: 'Мужской',
        value: 'male'
      },
      {
        display: 'Женский',
        value: 'female'
      }
    ])
    return {
      email,
      pass,
      emailRules,
      passwordRules,
      confirmPass,
      name,
      age,
      gender,
      genderVariants
    }
  },
  methods: {
    async signUp () {
      const data = new FormData()
      data.append('email', this.email)
      data.append('pass', this.pass)
      data.append('name', this.name)
      data.append('age', this.age)
      data.append('gender', this.gender)
      try {
        const response = await this.$axios.$post('http://localhost:8000/api/user/', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const user = response.user
        if (user) {
          this.$router.push({ name: 'signin' })
        } else {
          alert('Произошла ошибка')
        }
      } catch (e) {
        alert('Произошла ошибка')
      }
    }
  }
}
</script>

<style>

</style>
