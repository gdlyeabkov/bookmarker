<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
    </v-col>
  </v-row>
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
