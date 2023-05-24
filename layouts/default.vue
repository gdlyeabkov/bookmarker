<template>
  <v-app>
    <v-app-bar
      elevation="0"
      fixed
      app
      color="cyan">
      <v-app-bar-title>
        <img
         src="https://www.diigo.com/asset/images/logo_s2@2x.png"
         width="75" />
      </v-app-bar-title>
      <v-btn class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('library')">Моя библиотека</v-btn>
      <v-btn class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('outliners')">Мои структуры</v-btn>
      <v-btn class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('groups')">Мои группы</v-btn>
      <v-btn class="text-capitalize mx-2" color="transparent" elevation="0" @click="switchScreen('tools')">Инструменты</v-btn>
      <v-spacer />
      <v-btn class="text-capitalize mx-4" color="orange" :rounded="true">Улучшить</v-btn>
      <v-avatar color="info" size="24">
        <v-img src="https://resources.diigo.com/images/avatar/user/nickfish2020_96.jpg?rand=863" />
      </v-avatar>
      <v-btn class="text-capitalize" color="transparent" elevation="0">аккаунт</v-btn>
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
          <v-list-item class="clickable" @click="switchScreen('profile')">
            <v-list-item-title>Публичная библиотека</v-list-item-title>
          </v-list-item>
          <v-list-item class="clickable" @click="switchScreen('settings')">
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item>
          <v-list-item class="clickable" @click="switchScreen('support')">
            <v-list-item-title>Поддержка</v-list-item-title>
          </v-list-item>
          <v-list-item class="clickable" @click="switchScreen('discover')">
            <v-list-item-title>Обнаружить</v-list-item-title>
          </v-list-item>
          <v-list-item class="clickable" @click="switchScreen('help')">
            <v-list-item-title>Помощь</v-list-item-title>
          </v-list-item>
          <v-list-item class="clickable" @click="logout()">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid class="full-w non-pad">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      color="rgb(245, 245, 245)"
      app>
      <v-row justify="center" no-gutters>
        <span class="black--text ">&copy; {{ new Date().getFullYear() }} Diigo Inc.</span>
        <v-btn
          color="transparent"
          elevation="0"
          variant="text"
          class="black--text text-capitalize mx-2">
          <span>О нас</span>
        </v-btn>
        <v-btn
          color="transparent"
          elevation="0"
          variant="text"
          class="black--text text-capitalize mx-2">
          <span>Условия использования</span>
        </v-btn>
        <v-btn
          color="transparent"
          elevation="0"
          variant="text"
          class="black--text text-capitalize mx-2">
          <span>Политика конфиденциальности</span>
        </v-btn>
        <v-btn
          color="transparent"
          elevation="0"
          variant="text"
          class="black--text text-capitalize mx-2">
          <span>Блог</span>
        </v-btn>
        <v-btn
          color="transparent"
          elevation="0"
          variant="text"
          class="black--text text-capitalize mx-2">
          <span>Twitter</span>
        </v-btn>
        <v-btn
          color="transparent"
          elevation="0"
          variant="text"
          class="black--text text-capitalize mx-2">
          <span>Связаться с нами</span>
        </v-btn>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    switchScreen (screen) {
      this.$router.push(screen)
    },
    logout () {
      this.switchScreen('start')
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
