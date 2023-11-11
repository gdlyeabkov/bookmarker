<template>
  <v-app-bar
    elevation="0"
    color="#fff">
    <v-app-bar-title>
      <img
        src="@/assets/img/bookmarker_logo.png"
        width="75" />
    </v-app-bar-title>
    <v-spacer />
    <v-btn v-if="false" class="text-capitalize mx-2 blue--text" color="transparent" elevation="0" @click="switchScreen('library')">Загрузки</v-btn>
    <v-btn v-if="false" class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('library')">Блог</v-btn>
    <v-btn class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('signin')">Войти</v-btn>
    <v-btn
      class="text-capitalize mx-4"
      border
      text
      elevation="0"
      rounded
      @click="signUp">Зарегистрироваться</v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['SET_USER']),
    signUp () {
      this.$router.push({ name: 'signup' })
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
