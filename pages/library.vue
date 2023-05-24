<template>
  <div style="width: 100%;">
    <v-toolbar
      height="75"
      style="width: 100%;"
      fixed
      color="cyan">
      <v-toolbar-title>
        <v-btn class="text-capitalize mx-2" color="transparent" elevation="0">Моя библиотека</v-btn>
      </v-toolbar-title>
      <v-col cols="2">
        <v-text-field dense prepend-icon="mdi-magnify" append-icon="mdi-menu-down" placeholder="Поиск...">
        </v-text-field>
      </v-col>
      <v-spacer />
      <v-btn class="text-capitalize mx-4" color="transparent" elevation="0">Collapse All</v-btn>
      <v-btn class="text-capitalize mx-4" color="transparent" elevation="0">Bulk Edit</v-btn>
      <v-speed-dial
        v-model="fab"
        :top="true"
        :right="false"
        :bottom="false"
        :left="false"
        direction="bottom"
        transition="scale"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            :color="`${fab ? 'red' : 'blue'} darken-2`"
            dark
            fab
          >
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="blue"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </template>
          <span>Закладка</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="pink"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-file-image</v-icon>
            </v-btn>
          </template>
          <span>Фото</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="red"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-file-pdf-box</v-icon>
            </v-btn>
          </template>
          <span>PDF</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="green"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-clipboard-text</v-icon>
            </v-btn>
          </template>
          <span>Запись</span>
        </v-tooltip>
      </v-speed-dial>
    </v-toolbar>
    <v-row>
      <v-col cols="4">
        <v-row>
          <v-col>
            <v-icon class="mx-3">mdi-cube-outline</v-icon>
            <span>Все</span>
          </v-col>
          <v-col>
            <v-icon>mdi-menu-down</v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-icon class="mx-3">mdi-border-color</v-icon>
            <span>Аннотации</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-icon class="mx-3">mdi-circle</v-icon>
            <span>Непрочитанное</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>Еще</span>
            <v-icon>mdi-menu-down</v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>Теги</span>
          </v-col>
          <v-col>
            <span>Топ</span>
            <v-icon>mdi-menu-down</v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>Все теги</span>
          </v-col>
          <v-col>
            <span>Топ 300</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8"></v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const fab = ref(false)
    return {
      fab
    }
  }
}
</script>

<style>

</style>
