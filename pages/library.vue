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
      <v-menu transition="fab-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            class="text-capitalize mx-4 mt-8"
            color="blue"
            rounded
            width="50"
            min-width="50"
            max-width="50"
            height="50"
            min-height="50"
            max-height="50"
            v-bind="props">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
        >
          <v-list-item-title>{{`Item ${n}`}}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>
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
export default {

}
</script>

<style>

</style>
