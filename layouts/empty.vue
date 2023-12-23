<template>
  <v-app>
    <v-main>
      <v-container fluid class="full-w non-pad start-container">
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

  .start-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
</style>
