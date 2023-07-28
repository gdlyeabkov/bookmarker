<template>
  <v-app-bar
    elevation="0"
    fixed
    app
    color="transparent">
    <v-app-bar-title>
      <img
        src="https://www.diigo.com/images/v6/diigologolarge.png"
        width="75" />
    </v-app-bar-title>
    <v-spacer />
    <v-btn class="text-capitalize mx-2 blue--text" color="transparent" elevation="0" @click="switchScreen('library')">Загрузки</v-btn>
    <v-btn class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('library')">Блог</v-btn>
    <v-btn class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('signin')">Войти</v-btn>
    <v-btn
      class="text-capitalize mx-4"
      border
      flat
      elevation="0"
      rounded
      @click="signUp">Зарегистрироваться</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    async signUp () {
      const data = new FormData()
      data.append('email', 'test@example.com')
      data.append('pass', 'password')
      data.append('name', 'test')
      data.append('age', 5)
      data.append('gender', 'test')
      try {
        const response = await this.$axios.$post('http://localhost:8000/api/user/', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$router.push({ name: 'library', query: { id: response.id } })
      } catch (e) {
        alert('error')
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

</style>
