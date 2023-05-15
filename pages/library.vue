<template>
  <div style="width: 100%;">
    <v-toolbar
      style="width: 100%;"
      fixed
      color="cyan">
      <v-toolbar-title>
        <v-btn class="text-capitalize mx-2" color="transparent" elevation="0">Моя библиотека</v-btn>
      </v-toolbar-title>
      <v-col cols="2">
        <v-text-field dense>
          <template v-slot:label>
            <span>
              <v-icon icon="mdi-file-find"></v-icon>
            </span>
          </template>
        </v-text-field>
      </v-col>
      <v-spacer />
      <v-btn class="text-capitalize mx-4" color="transparent" elevation="0">Collapse All</v-btn>
      <v-btn class="text-capitalize mx-4" color="transparent" elevation="0">Bulk Edit</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
