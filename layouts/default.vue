<template>
  <v-app>
    <Header />
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
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
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
