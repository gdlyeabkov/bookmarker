<template>
  <div>
    <v-card
      v-for="item in 6"
      :key="item"
      class="pa-5"
      :color="`rgb(${40 * item}, 200, 250)`"
      height="350"
      elevation="0">
      <v-card-title>
        <v-row>
          <v-spacer v-if="item % 2 === 0" />
          <p class="white--text">Bookmarker</p>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-spacer v-if="item % 2 === 0" />
          <p class="white--text">Your Learning, Simplified</p>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer v-if="item % 2 === 0" />
        <v-btn width="200" height="35"  class="white--text" color="rgb(255, 200, 0)" @click="$router.push({ name: 'signup' })">Начать</v-btn>
      </v-card-actions>
    </v-card>
    <v-footer height="400" color="rgb(50, 200, 250)">
      <v-col>
        <span class="grey--text my-2">&copy; {{ new Date().getFullYear() }} Bookmarker Inc.</span>
        <v-row class="my-4">
          <p class="mx-3">About</p>
          <p class="mx-3">Pricing & Plans</p>
          <p class="mx-3">Terms of Service</p>
          <p class="mx-3">Privacy Policy</p>
          <p class="mx-3">Contact Us</p>
        </v-row>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  layout: 'start'
}
</script>

<style>

</style>
