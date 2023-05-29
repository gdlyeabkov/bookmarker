<template>
  <v-footer
    color="rgb(245, 245, 245)"
    app>
    <v-row justify="center" no-gutters>
      <span class="grey--text my-2">&copy; {{ new Date().getFullYear() }} Diigo Inc.</span>
      <v-btn
        color="transparent"
        elevation="0"
        variant="text"
        class="grey--text text-capitalize mx-2">
        <span>О нас</span>
      </v-btn>
      <v-btn
        color="transparent"
        elevation="0"
        variant="text"
        class="grey--text text-capitalize mx-2">
        <span>Условия использования</span>
      </v-btn>
      <v-btn
        color="transparent"
        elevation="0"
        variant="text"
        class="grey--text text-capitalize mx-2">
        <span>Политика конфиденциальности</span>
      </v-btn>
      <v-btn
        color="transparent"
        elevation="0"
        variant="text"
        class="grey--text text-capitalize mx-2">
        <span>Блог</span>
      </v-btn>
      <v-btn
        color="transparent"
        elevation="0"
        variant="text"
        class="grey--text text-capitalize mx-2">
        <span>Twitter</span>
      </v-btn>
      <v-btn
        color="transparent"
        elevation="0"
        variant="text"
        class="grey--text text-capitalize mx-2">
        <span>Связаться с нами</span>
      </v-btn>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  setup () {
  }
}
</script>
