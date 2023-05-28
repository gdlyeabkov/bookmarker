<template>
  <div style="width: 100%;">
    <v-toolbar
      height="75"
      style="width: 100%;"
      fixed
      color="cyan">
      <v-toolbar-title>
        <v-row>
          <v-col
            class="mt-10">
            <img
              src="https://www.diigo.com/asset/images/logo_s2@2x.png"
              width="75" />
          </v-col>
          <v-col>
            <p>nickfish2020</p>
            <p>Member since May 14, 2023</p>
          </v-col>
        </v-row>
      </v-toolbar-title>
      <v-spacer />
      <v-col cols="4">
        <v-text-field dense prepend-icon="mdi-magnify" append-icon="mdi-menu-down" placeholder="Поиск...">
        </v-text-field>
      </v-col>
    </v-toolbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
