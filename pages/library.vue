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
      <v-bottom-sheet v-model="sheet">
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            class="text-capitalize mx-4"
            color="transparent"
            elevation="0"
            v-bind="attrs"
            v-on="on">Bulk Edit</v-btn>
        </template>
        <v-card
          title="Bottom Sheet"
          text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, eos? Nulla aspernatur odio rem, culpa voluptatibus eius debitis dolorem perspiciatis asperiores sed consectetur praesentium! Delectus et iure maxime eaque exercitationem!"
        >
          <v-row>
            <v-col
              cols="5"
              class="ma-5">
              <span class="mx-2">Select all</span>
              <span class="mx-2">0 item selected</span>
              <span class="mx-2">Click item to select</span>
            </v-col>
            <v-col
              cols="5"
              class="ma-5">
              <v-btn @click="closeSheet">
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-bottom-sheet>
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
              :key="article"
              class="ma-5">
              <v-row>
                <v-col cols="8">
                  <v-row>
                    <v-col cols="2">
                      <p>{{article.title}}</p>
                    </v-col>
                    <v-col cols="2">
                      <v-icon>mdi-circle</v-icon>
                      <v-hover
                        v-slot="{ isHovering, props }">
                          <v-icon
                            v-bind="props"
                            :class="{'d-none': isHovering}">mdi-grease-pencil</v-icon>
                      </v-hover>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <a :href="article.url">{{article.url}}</a>
                    </v-col>
                    <v-col
                      cols="2"
                      v-for="(tag, index) in article.tags"
                      :key="index">
                      <v-chip
                        label>{{tag}}</v-chip>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="4">
                  <v-row>
                    <v-col cols="6">
                      <p>May 14, 2023</p>
                    </v-col>
                    <v-col cols="6">
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
                          <v-list-item class="clickable" @click="edit(article)">
                            <v-list-item-title>Редактировать</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="remove(article)">
                            <v-list-item-title>Удалить</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="getLink(article)">
                            <v-list-item-title>Получить общедоступную ссылку</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="sendEmail(article)">
                            <v-list-item-title>Отправить E-mail</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="markAsUnread(article)">
                            <v-list-item-title>Отметить как непрочитанное</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="addInOutliner(article)">
                            <v-list-item-title>Добавить в структуру</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="shareGroup(article)">
                            <v-list-item-title>Поделиться в группе</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider class="ma-2" />
            </div>
            <v-pagination
              :length="getPageCount()"
              rounded />
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
          <div v-if="bookmarkAlertStep === 2">
            <v-text-field placeholder="Название" />
            <v-text-field placeholder="Описание" />
            <v-text-field placeholder="Тэги" />
            <v-text-field placeholder="Поделиться в иерархии" />
            <v-text-field placeholder="Поделиться в группе" />
            <v-text-field placeholder="Приватный" />
            <v-text-field placeholder="Читать позже" />
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            @click="next"
          >{{bookmarkAlertNextBtnText}}</v-btn>
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
    const bookmarkAlertNextBtnText = ref('Далее')
    const bookmarkAlertStep = ref(1)
    const sheet = ref(false)
    return {
      fab,
      isLoading,
      dialog,
      articles,
      bookmarkAlertNextBtnText,
      bookmarkAlertStep,
      sheet
    }
  },
  mounted () {
    this.getArticleContent()
  },
  methods: {
    getPageCount () {
      const articlesCount = this.articles.length
      const pages = Math.ceil(articlesCount / 10)
      return pages
    },
    addBookmark () {
      this.dialog = true
    },
    closeAlert () {
      this.dialog = false
    },
    getArticleContent () {
      setTimeout(() => {
        // this.articles = []
        this.articles = [
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [
              'youtube',
              'hosting',
              'video'
            ]
          }
        ]
        this.isLoading = false
      }, 3000)
    },
    next () {
      if (this.bookmarkAlertStep === 1) {
        this.bookmarkAlertNextBtnText = 'Добавить'
        this.bookmarkAlertStep = 2
      } else if (this.bookmarkAlertStep === 2) {
        this.bookmarkAlertNextBtnText = 'Далее'
        this.bookmarkAlertStep = 1
        this.closeAlert()
      }
    },
    edit (article) {

    },
    remove (article) {

    },
    getLink (article) {

    },
    sendEmail (article) {

    },
    markAsUnread (article) {

    },
    addInOutliner (article) {

    },
    shareGroup (article) {

    },
    closeSheet () {
      this.sheet = !this.sheet
    }
  }
}
</script>

<style>

</style>
