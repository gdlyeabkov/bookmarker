<template>
  <v-container class="h-100">
    <v-row
      justify="center"
      align="center"
      class="h-100">
        <v-progress-circular
          indeterminate
          size="128"  />
    </v-row>
  </v-container>
</template>
<script>
export default {
  async mounted () {
    try {
      const response = await this.$axios.$get('http://localhost:8000/api/user/token')
      const user = response.user
      if (user) {
        await this.setUser(user)
        this.$router.push({ path: '/library' })
      } else {
        this.$router.push({ path: '/start' })
      }
    } catch (e) {

    }
  }
}
</script>
