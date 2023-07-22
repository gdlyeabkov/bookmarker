<template>
  <v-app>
    <v-main>
      <v-container fluid class="full-w non-pad">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
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
