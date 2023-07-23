<template>
  <v-container>
    <v-row class="my-5">
      <v-col>
        <img
          src="https://www.diigo.com/images/v6/diigologolarge.png"
          width="250" />
      </v-col>
      <v-divider
        class="mx-5"
        vertical />
      <v-col>
        <v-form>
          <p>Войти в diigo</p>
          <v-text-field
            placeholder="User name or email address" />
          <v-text-field
            placeholder="Password" />
          <v-row>
            <v-col>
              <v-btn
                color="blue"
                class="white--text">Войти</v-btn>
            </v-col>
            <v-col>
              <p>Забыли пароль?</p>
            </v-col>
          </v-row>
          <p>Войдите через другие аккаунты</p>
          <v-btn class="my-2" width="100%">Google</v-btn>
          <v-btn class="my-2" width="100%">Facebook</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <p class="text-center">У вас еще нет Diggo аккаунта? <span class="blue--text">Создайте Diigo аккаунт сейчас</span></p>
  </v-container>
</template>
<script>
export default {
  layout: 'empty'
}
</script>
<style>
</style>
