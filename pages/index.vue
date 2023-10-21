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
import { mapActions } from 'vuex'
export default {
  async mounted () {
    // const id = sessionStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // const response = await this.$axios.$get(`http://localhost:8000/api/user/token/?id=${id}`, {
        const response = await this.$axios.$get('http://localhost:8000/api/user/token/', {
          headers: {
            Authorization: token
          }
        })
        const user = response.user
        if (user) {
          await this.setUser(user)
          this.$router.push({ path: '/library' })
        } else {
          this.$router.push({ path: '/start' })
        }
      } catch (e) {}
    } else {
      this.$router.push({ path: '/start' })
    }
  },
  methods: {
    ...mapActions([
      'setUser'
    ])
  }
}
</script>
