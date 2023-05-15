<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="cyan">
      <v-app-bar-title>
        <img
         src="https://www.diigo.com/asset/images/logo_s2@2x.png"
         width="75" />
      </v-app-bar-title>
      <v-btn class="text-capitalize mx-2" color="transparent" elevation="0">Моя библиотека</v-btn>
      <v-btn class="text-capitalize mx-2" color="transparent" elevation="0">Мои структуры</v-btn>
      <v-btn class="text-capitalize mx-2" color="transparent" elevation="0">Мои группы</v-btn>
      <v-btn class="text-capitalize mx-2" color="transparent" elevation="0">Инструменты</v-btn>
      <v-spacer />
      <v-btn class="text-capitalize mx-4" color="orange" rounded="true">Улучшить</v-btn>
      <v-avatar color="info" size="24">
        <v-img src="https://resources.diigo.com/images/avatar/user/nickfish2020_96.jpg?rand=863" />
      </v-avatar>
      <v-btn class="text-capitalize" color="transparent" elevation="0">аккаунт</v-btn>
      <v-btn icon>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      color="rgb(245, 245, 245)"
      :absolute="!fixed"
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
  data () {
    return {
      clipped: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  }
}
</script>
