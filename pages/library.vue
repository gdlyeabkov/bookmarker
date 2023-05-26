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
              @click="addBookmark"
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
      <v-col cols="8">
        <div
          v-if="isLoading"
          class="ma-5 text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            size="72"
          />
        </div>
        <div v-else>
          <div v-if="articles.length">
            <div
              v-for="article in articles"
              :key="article">
              <p>{{article}}</p>
            </div>
          </div>
          <div
            v-else
            class="ma-5 text-center">
            <img src="https://www.diigo.com/asset/images/noitem_cartoon.png" alt="Не найдено" />
            <p>Статей нет!</p>
            <p>Вы можее добавить ее сами.</p>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2">Закладка</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field placeholder="URL" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            @click="closeAlert"
          >Далее</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const fab = ref(false)
    const isLoading = ref(true)
    const dialog = ref(false)
    const articles = ref([])
    return {
      fab,
      isLoading,
      dialog,
      articles
    }
  },
  mounted () {
    this.getArticleContent()
  },
  methods: {
    addBookmark () {
      this.dialog = true
    },
    closeAlert () {
      this.dialog = false
    },
    getArticleContent () {
      setTimeout(() => {
        this.articles = []
        this.isLoading = false
      }, 3000)
    }
  }
}
</script>

<style>

</style>
