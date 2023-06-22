<template>
  <div style="width: 100%; color: red;">
    <v-toolbar
      height="75"
      style="width: 100%;"
      fixed
      color="cyan">
      <v-toolbar-title>
        <v-btn class="text-capitalize mx-2" color="transparent" elevation="0">Мои структуры</v-btn>
      </v-toolbar-title>
      <v-col cols="2">
        <v-autocomplete
          clearable
          append-icon="mdi-magnify"
          label="Поиск структуры..."
          v-model="autocomplete"
          :items="suggestions"
          hide-no-data
          @click:append="getArticleContent" />
      </v-col>
      <v-spacer />
      <v-speed-dial
        v-model="fab"
        :top="true"
        :right="false"
        :bottom="false"
        :left="false"
        direction="bottom"
        transition="scale">
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            :color="'#6fd27a'"
            dark
            fab
            @click="addOutliner">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
      </v-speed-dial>
    </v-toolbar>
    <v-container>
      <v-simple-table>
        <thead>
          <tr v-for="header in headers" :key="header">
            <th v-for="head in header" :key="head" :colspan="head.colspan">{{head.value}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(outliner,  outlinerIdx) in outliners" :key="outlinerIdx">
            <td v-for="item in outliner" :key="item">
              <p>{{ item }}</p>
            </td>
            <td>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item class="clickable" @click="rename(outliner, outlinerIdx)">
                    <v-list-item-title>Переименовать</v-list-item-title>
                  </v-list-item>
                  <v-list-item class="clickable" @click="remove(outliner, outlinerIdx)">
                    <v-list-item-title>Удалить</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
    <v-dialog
      v-model="dialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2">Создать</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="title" placeholder="Название" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            @click="create"
          >Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="renameDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2">Переименовать</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeRenameAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="title" placeholder="Название" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="blue"
            class="white--text"
            variant="text"
            @click="save"
          >Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="removeDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2">Удалить</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeRemoveAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <p
            class="title ma-5">{{`Вы удаляете структуру (${getSelectedOutlinerTitle()}).`}}</p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="transparent"
            elevation="0"
            variant="text"
            @click="closeRemoveAlert">Отменить</v-btn>
          <v-btn
            color="red"
            class="white--text"
            variant="text"
            @click="deleteOutliner">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-slide-x-transition class="w-100">
      <v-alert
        v-if="isShowNotification"
        height="50"
        width="500"
        color="#2A3B4D"
        position="fixed"
        location="left"
        close-icon="mdi-circle"
        class="text--white white--text">{{notificationContent}}</v-alert>
    </v-slide-x-transition>
    <v-row class="d-flex justify-start">
      <v-snackbar
        v-model="hasShowNotification"
        :timeout="2000"
        position="absolute"
        location="bottom left"
      >
        Your profile has been updated
      </v-snackbar>
    </v-row>
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
    const bookmarkAlertNextBtnText = ref('Далее')
    const bookmarkAlertStep = ref(1)
    const sheet = ref(false)
    const itemsPerPage = ref(24)
    const page = ref(1)
    const visibility = ref('Фильтр')
    const date = ref('Дата создания')
    const articleExpanders = ref([])
    const title = ref('')
    const isShowNotification = ref(false)
    const notificationContent = ref('')
    const selectedOutlinerIndex = ref(-1)
    const autocomplete = ref('')
    const suggestions = ref([])
    const headers = ref([
      {
        title: 'A',
        align: 'start',
        sortable: false,
        key: 'title'
      }
    ])
    const outliners = ref([])
    const renameDialog = ref(false)
    const removeDialog = ref(false)
    const hasShowNotification = ref(false)
    return {
      fab,
      isLoading,
      dialog,
      articles,
      bookmarkAlertNextBtnText,
      bookmarkAlertStep,
      sheet,
      itemsPerPage,
      page,
      visibility,
      date,
      articleExpanders,
      title,
      isShowNotification,
      notificationContent,
      selectedOutlinerIndex,
      autocomplete,
      suggestions,
      headers,
      outliners,
      renameDialog,
      removeDialog,
      hasShowNotification
    }
  },
  mounted () {
    this.getArticleContent()
  },
  methods: {
    getSelectedOutlinerTitle () {
      let title = ''
      const selectedOutliner = this.outliners[this.selectedOutlinerIndex]
      if (selectedOutliner) {
        title = selectedOutliner.title
      }
      return title
    },
    updateSuggestions () {
      const val = []
      if (this.autocomplete.length) {
        val.push(this.autocomplete)
        val.push(`Поиск #${this.autocomplete}`)
      }
      this.suggestions = val
      alert(val)
      this.$forceUpdate()
    },
    rename (a, b) {
      this.selectedOutlinerIndex = b
      this.title = this.outliners[this.selectedOutlinerIndex].title
      this.renameDialog = true
    },
    save () {
      this.closeRenameAlert()
      this.outliners[this.selectedOutlinerIndex].title = this.title
      this.title = ''
      this.$forceUpdate()
    },
    getArticleOutliners (article) {
      return article.outliners.map(outliner => outliner.name).join(',')
    },
    add () {
      this.closeAddToOutlinerAlert()
    },
    closeRenameAlert () {
      this.renameDialog = false
    },
    closeRemoveAlert () {
      this.removeDialog = false
      this.notificationContent = '1 структура была удалена'
      this.hasShowNotification = true
    },
    toggleArticleSelection (idx) {
      if (this.sheet) {
        this.selectedArticles[idx] = !this.selectedArticles[idx]
        this.$forceUpdate()
      }
    },
    getPageCount () {
      const articlesCount = this.articles.length
      const pages = Math.ceil(articlesCount / this.itemsPerPage)
      return pages
    },
    addOutliner () {
      this.dialog = true
    },
    closeSheet () {
      this.sheet = !this.sheet
    },
    closeAlert () {
      this.dialog = false
    },
    getArticleContent () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    },
    create () {
      this.outliners.push({
        title: this.title
      })
      this.closeAlert()
      this.title = ''
    },
    remove (a, b) {
      this.selectedOutlinerIndex = b
      this.removeDialog = true
    },
    deleteOutliner () {
      this.outliners = this.outliners.filter((outliner, idx) => idx !== this.selectedOutlinerIndex)
      this.closeRemoveAlert()
      this.$forceUpdate()
    },
    getArticlesForPage (page) {
      return this.articles.filter((article, articleIdx) => {
        const aritcleNum = articleIdx + 1
        return articleIdx < page * this.itemsPerPage && aritcleNum > page * this.itemsPerPage - this.itemsPerPage
      })
    },
    selectAll () {
      this.selectedArticles.fill(true)
      this.$forceUpdate()
    },
    toggleExpanders () {
      if (this.articleExpanders.length) {
        const articleExpanderVal = !this.articleExpanders[0]
        this.articleExpanders.fill(articleExpanderVal)
        this.$forceUpdate()
      }
    }
  }
}
</script>
<style>
  .clickable {
    cursor: pointer !important;
  }
  .absolute {
    position: fixed;
    left: 15px;
    top: calc(100% - (50px + 15px));
  }
</style>
