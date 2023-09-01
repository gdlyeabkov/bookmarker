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
        <v-autocomplete
          clearable
          append-icon="mdi-magnify"
          label="Поиск..."
          v-model="autocomplete"
          :items="suggestions"
          hide-no-data
          @click:append="getArticleContent" />
      </v-col>
      <v-spacer />
      <v-btn
        class="text-capitalize mx-4"
        color="transparent"
        elevation="0"
        @click="toggleExpanders">{{articleExpanders[0] ? 'Сжать все' : 'Расширить все'}}</v-btn>
      <v-btn
        class="text-capitalize mx-4"
        color="transparent"
        elevation="0"
        @click="toggleSheet">{{sheet ? 'Быстрое редактирование' : 'Массовое редактирование'}}</v-btn>
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
      <v-col
        cols="3"
        class="ma-5">
        <v-row
          class="clickable"
          @click="getAllArticles">
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
        <v-row
          class="clickable"
          @click="getUnreadArticles">
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
              v-for="(article, articleIdx) in getArticlesForPage(page)"
              :key="article.id"
              @click="toggleArticleSelection(articleIdx)"
              :class="{'ma-5': true, 'clickable': sheet, 'pa-5': true}"
              :style="sheet && selectedArticles[articleIdx] ?
                  {
                    background: 'rgba(200, 230, 255, 255)'
                  }
                :
                  ''">
              <v-row>
                <v-col cols="8">
                  <v-row>
                    <v-col
                      v-if="article.isUnreaded"
                      cols="1">
                      <v-icon>mdi-circle-small</v-icon>
                    </v-col>
                    <v-col cols="2">
                      <p>{{article.title}}</p>
                    </v-col>
                    <v-col cols="2">
                      <v-icon v-if="article.isPrivate">mdi-circle</v-icon>
                      <v-hover
                        v-slot="{ isHovering, props }">
                          <v-icon
                            v-bind="props"
                            :class="{'d-none': isHovering, 'clickable': true}">mdi-grease-pencil</v-icon>
                      </v-hover>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3" class="overflow-hidden">
                      <a :href="article.url">{{article.url}}</a>
                    </v-col>
                    <v-chip-group
                      v-if="article.tags.length"
                      class="ml-2">
                      <v-chip
                        v-for="(tag, index) in article.tags"
                        :key="index"
                        class="clickable"
                        label>{{tag}}</v-chip>
                    </v-chip-group>
                    <v-col
                      v-else
                      cols="2">
                        <v-chip
                          v-if="!isAddTag[articleIdx]"
                          class="clickable"
                          label
                          @click="toggleTag(articleIdx)">+ Тэг</v-chip>
                        <v-row
                          v-else
                          dense
                          no-gutters>
                          <v-col class="ma-0 pa-0">
                            <v-text-field class="ma-0 pa-0" dense />
                          </v-col>
                          <v-col class="ma-0 pa-0">
                            <v-icon @click="toggleTag(articleIdx)">mdi-check</v-icon>
                          </v-col>
                          <v-col class="ma-0 pa-0">
                            <v-icon @click="toggleTag(articleIdx)">mdi-close</v-icon>
                          </v-col>
                        </v-row>
                      </v-col>
                  </v-row>
                  <p v-if="isHaveOutliners(article)">В <span class="font-weight-bold">структуре</span>: {{getArticleOutliners(article)}}</p>
                </v-col>
                <v-col cols="4">
                  <v-row>
                    <v-col cols="6">
                      <p>{{ article.date }}</p>
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
                        <v-list v-if="!sheet">
                          <v-list-item class="clickable" @click="edit(article, articleIdx)">
                            <v-list-item-title>Редактировать</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="remove(articleIdx)">
                            <v-list-item-title>Удалить</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="getLink(article)">
                            <v-list-item-title>Получить общедоступную ссылку</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="sendEmail(article)">
                            <v-list-item-title>Отправить E-mail</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="clickable" @click="markAsUnread(article)">
                            <v-list-item-title>{{
                              article.isUnreaded ?
                                'Отметить как прочитанное'
                              :
                                'Отметить как непрочитанное'
                            }}</v-list-item-title>
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
              <div v-if="articleExpanders[articleIdx]">
                <div v-html="article.body" />
              </div>
              <v-divider class="ma-2" />
            </div>
            <v-row>
              <v-col cols="3">
                <v-row class="my-4">
                  <p class="mx-2 my-1">{{articles.length}} элемента,</p>
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mx-2"
                        icon
                        v-bind="attrs"
                        v-on="on">{{itemsPerPage}}</v-btn>
                    </template>
                    <v-list>
                      <v-list-item class="clickable" @click="setItemPerPage(24)">
                        <v-list-item-title>24</v-list-item-title>
                      </v-list-item>
                      <v-list-item class="clickable" @click="setItemPerPage(48)">
                        <v-list-item-title>48</v-list-item-title>
                      </v-list-item>
                      <v-list-item class="clickable" @click="setItemPerPage(96)">
                        <v-list-item-title>96</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <p class="mx-2 my-1">эл/стр</p>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-pagination
                v-model="page"
                :length="getPageCount()"
                rounded />
              </v-col>
              <v-col cols="3">
                <v-row class="my-4">
                  <v-col cols="6">
                    <v-menu>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on">{{visibility}}<v-icon size="20">mdi-chevron-down</v-icon></v-btn>
                      </template>
                      <v-list>
                        <v-list-item class="clickable" @click="setVisibility('Фильтр')">
                          <v-list-item-title>Фильтр</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="clickable" @click="setVisibility('Публичные')">
                          <v-list-item-title>Публичные</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="clickable" @click="setVisibility('Приватные')">
                          <v-list-item-title>Приватные</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                  <v-col cols="4">
                    <v-menu>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on">{{date}}<v-icon size="20">mdi-chevron-down</v-icon></v-btn>
                      </template>
                      <v-list>
                        <v-list-item class="clickable" @click="setDate('Дата создания')">
                          <v-list-item-title>Дата создания</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="clickable" @click="setDate('Дата обновления')">
                          <v-list-item-title>Дата обновления</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-icon class="ml-2 my-1" color="orange">mdi-rss-box</v-icon>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
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
            <p class="text-capitalize mx-2 white--text">Закладка</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon
            color="white"
            @click="closeAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="url" placeholder="URL" />
          <div v-if="bookmarkAlertStep === 2">
            <v-text-field v-model="title" placeholder="Название" />
            <v-text-field v-model="desc" placeholder="Описание" />
            <v-text-field v-model="tags" placeholder="Тэги" />
            <v-select v-model="shareToOutliner" placeholder="Поделиться в иерархии" />
            <v-select v-model="shareToGroup" placeholder="Поделиться в группе" />
            <v-checkbox v-model="isPrivate" label="Приватный" />
            <v-checkbox v-model="readLater" label="Читать позже" />
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            @click="next"
            color="#0000FF"
            class="white--text"
            :disabled="isAddBookmarkLoading">
            <v-progress-circular
              v-if="isAddBookmarkLoading"
              indeterminate
              color="white"
              size="24" />
            {{
              isAddBookmarkLoading ?
                ''
              :
                bookmarkAlertNextBtnText
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="editDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2">Редактировать элемент</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeEditAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="title" placeholder="Название" />
          <v-text-field v-model="url" placeholder="URL" />
          <v-textarea v-model="desc" placeholder="Описание" />
          <v-text-field v-model="tags" placeholder="Тэги" />
          <v-select v-model="shareToOutliner" placeholder="Поделиться в иерархии" />
          <v-select v-model="shareToGroup" placeholder="Поделиться в группе" />
          <v-checkbox v-model="isPrivate" label="Приватный" />
          <v-checkbox v-model="readLater" label="Читать позже" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            @click="saveEdit"
          >Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="shareLinkDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2">Поделиться страницей</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeShareLinkAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-row class="ma-5">
            <v-text-field
              :value="link"
              readonly />
            <v-btn
              color="cyan"
              class="white--text"
              @click="shareLink"
            >Превью</v-btn>
          </v-row>
          <v-row>
            <button class="fab fa-twitter btn btn btn-light mx-2" />
            <button class="fab fa-facebook btn btn btn-light mx-2" />
            <button class="fab fa-youtube btn btn btn-light mx-2" />
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="sendEmailDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2">Отправить на почту</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeSendEmailAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="to"
            placeholder="Используте Enter для добавления нескольких E-mail"
            @keydown.enter="addEmail">
            <template v-slot:prepend-inner>
              <v-chip-group column>
                <v-chip
                  v-for="(email, index) in emails"
                  :key="index"
                  class="ma-1"
                  close
                  v-model="emailVals[index]">
                  {{email}}
                </v-chip>
              </v-chip-group>
            </template>
          </v-text-field>
          <v-text-field
            v-model="subject"
            placeholder="Тема" />
          <v-textarea
            v-model="msg"
            placeholder="Сообщение" />
          <v-row class="d-flex justify-end">
            <v-btn
              color="cyan"
              class="white--text"
              @click="send"
            >Отправить</v-btn>
          </v-row>
          <div
            class="mt-5"
            v-html="markup" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="addToOutlinerDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2">Добавить элемент в структуру</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeAddToOutlinerAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-select
            :items="shareToOutliner"
            placeholder="Поделитесь в структуре"
            class="my-5" />
          <v-row class="d-flex justify-end my-5">
            <v-btn
              variant="text"
              @click="add"
            >Добавить</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="shareToGroupDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2">Добавить элемент в группу</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeShareToGroupAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-select
            :items="shareToGroup"
            placeholder="Поделитесь в группе" />
          <v-row class="d-flex justify-end">
            <v-btn
              variant="text"
              @click="share">Поделиться</v-btn>
            </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-slide-y-transition class="w-100">
      <v-footer
        class="w-100 pa-5"
        v-show="sheet"
        elevation="5"
        color="rgb(255, 255, 255)"
        app>
        <v-row
          class="w-100">
          <v-col
            cols="4"
            class="ma-5">
            <v-btn
              class="text-capitalize mx-2 green--text"
              color="transparent"
              elevation="0"
              @click="selectAll">Выбрать все</v-btn>
            <v-chip
              color="green"
              class="white--text">{{selectedArticles.filter(item => item).length}}</v-chip>
            <span class="mx-2"> элементов выбрано</span>
          </v-col>
          <v-col
            v-if="selectedArticles.filter(item => item).length > 0"
            cols="6">
            <v-row>
              <v-btn
                class="ma-2"
                outlined>Организовать в структуре</v-btn>
              <v-btn
                class="ma-2"
                outlined>Поделиться в группе</v-btn>
              <v-btn
                class="ma-2"
                outlined>Отправить почту</v-btn>
              <v-btn
                class="ma-2"
                outlined>Создать отчет</v-btn>
              <v-btn
                icon
                class="ma-2 red--text"
                @click="removeMuliple">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                class="ma-2">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col
            v-else
            class="ma-5"
            cols="4">
            <span class="ma-2 green--text">Щелкните на элемент чтобы выбрать</span>
          </v-col>
          <v-spacer v-if="selectedArticles.filter(item => item).length <= 0" />
          <v-col
            cols="1"
            class="ma-5">
            <v-btn
              icon
              class="green--text"
              @click="closeSheet">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-footer>
    </v-slide-y-transition>
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
  </div>
</template>

<script>
import { ref } from 'vue'
import moment from 'moment'
export default {
  layout: 'personal',
  async asyncData ({ $axios }) {
    try {
      const response = await $axios.$get('http://localhost:8000/api/bookmarks')
      const status = response.status
      const isSuccessfull = status === 'OK'
      let bookmarks = []
      // const bookmarks = []
      if (isSuccessfull) {
        bookmarks = response.bookmarks.map((bookmark) => {
          return {
            id: bookmark.id,
            title: bookmark.title,
            url: bookmark.url,
            tags: [],
            body: bookmark.body,
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: bookmark.isPrivate,
            date: moment(bookmark.date).locale('ru').format('MMMM D, YYYY')
          }
        })
      }
      let isLoading = true
      const selected = []
      const expanders = []
      for (let i = 0; i < bookmarks.length; i++) {
        selected.push(false)
        expanders.push(false)
      }
      isLoading = bookmarks.length <= 0
      return {
        isLoading,
        articles: bookmarks,
        selectedArticles: selected,
        articleExpanders: expanders
      }
    } catch (e) {
      return {}
    }
  },
  setup () {
    const isAddBookmarkLoading = ref(false)
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
    const selectedArticles = ref([])
    const articleExpanders = ref([])
    const url = ref('')
    const title = ref('')
    const desc = ref('')
    const tags = ref('')
    const shareToOutliner = ref([])
    const shareToGroup = ref([])
    const isPrivate = ref(false)
    const readLater = ref(false)
    const editDialog = ref(false)
    const isShowNotification = ref(false)
    const notificationContent = ref('')
    const selectedArticleindex = ref(-1)
    const shareLinkDialog = ref(false)
    const link = ref('')
    const sendEmailDialog = ref(false)
    const to = ref('')
    const subject = ref('')
    const msg = ref('')
    const markup = ref('')
    const addToOutlinerDialog = ref(false)
    const shareToGroupDialog = ref(false)
    const autocomplete = ref('')
    const suggestions = ref([])
    const body = ref('_')
    const isAddTag = ref([])
    const emails = ref([])
    const emailVals = ref([])
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
      selectedArticles,
      articleExpanders,
      url,
      title,
      desc,
      tags,
      shareToOutliner,
      shareToGroup,
      isPrivate,
      readLater,
      editDialog,
      isShowNotification,
      notificationContent,
      selectedArticleindex,
      shareLinkDialog,
      link,
      sendEmailDialog,
      to,
      subject,
      msg,
      markup,
      addToOutlinerDialog,
      shareToGroupDialog,
      autocomplete,
      suggestions,
      isAddBookmarkLoading,
      body,
      isAddTag,
      emails,
      emailVals
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    addEmail () {
      this.emails.push(this.to)
      this.emailVals.push(this.to)
      this.to = ''
    },
    getAllArticles () {

    },
    isHaveOutliners (article) {
      let isHave = false
      const articleOutliners = article.outliners
      if (articleOutliners) {
        isHave = articleOutliners.length
      }
      return isHave
    },
    getUnreadArticles () {
      this.articles = this.articles.filter(article => article.isUnreaded)
    },
    async removeMuliple () {
      try {
        const selectedIds = []
        let idx = -1
        for (const selectedArticle of this.selectedArticles) {
          idx++
          if (selectedArticle) {
            selectedIds.push(this.articles[idx].id)
          }
        }
        const ids = selectedIds.join(',')
        const data = {}
        await this.$axios.$delete(`http://localhost:8000/api/bookmarks/?ids=${ids}`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.articles = this.articles.filter((article, idx) => !selectedIds.includes(article.id))
        this.$forceUpdate()
      } catch (e) {
        /*
         *  TODO
         *  show error
         */
      }
    },
    toggleSheet () {
      this.sheet = !this.sheet
      if (!this.sheet) {
        this.selectedArticles.fill(false)
      }
      this.$forceUpdate()
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
    share () {
      this.closeShareToGroupAlert()
    },
    getArticleOutliners (article) {
      if (!article.outliners) {
        return []
      }
      return article.outliners.map(outliner => outliner.name).join(',')
    },
    add () {
      this.closeAddToOutlinerAlert()
    },
    closeShareToGroupAlert () {
      this.shareToGroupDialog = false
    },
    closeAddToOutlinerAlert () {
      this.addToOutlinerDialog = false
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
    addBookmark () {
      this.dialog = true
    },
    closeAlert () {
      this.dialog = false
    },
    closeEditAlert () {
      this.selectedArticleindex = -1
      this.editDialog = false
      this.title = ''
      this.url = ''
      this.desc = ''
      this.tags = ''
      this.isPrivate = false
      this.readLater = false
    },
    async getArticleContent () {
      this.isLoading = true
      try {
        const response = await this.$axios.$get('http://localhost:8000/api/bookmarks')
        const status = response.status
        const isSuccessfull = status === 'OK'
        let bookmarks = []
        if (isSuccessfull) {
          bookmarks = response.bookmarks.map((bookmark) => {
            return {
              id: bookmark.id,
              title: bookmark.title,
              url: bookmark.url,
              tags: [],
              body: bookmark.body,
              isUnreaded: false,
              outliners: [
                {
                  id: -1,
                  name: 'A'
                }
              ],
              isPrivate: bookmark.isPrivate,
              date: bookmark.date
            }
          })
        }
        this.articles = bookmarks.filter((item) => {
          const title = item.title
          const isMatch = title.includes(this.autocomplete)
          return isMatch
        })
        this.selectedArticles = []
        this.articleExpanders = []
        for (let i = 0; i < this.articles.length; i++) {
          this.selectedArticles.push(false)
          this.articleExpanders.push(false)
        }
        this.isLoading = bookmarks.length <= 0
      } catch (e) {

      }
    },
    async next () {
      const isFirstStep = this.bookmarkAlertStep === 1
      const isSecondStep = this.bookmarkAlertStep === 2
      const isSetUrl = this.url.length
      const isExpandForm = isFirstStep && isSetUrl
      if (isExpandForm) {
        this.isAddBookmarkLoading = true
        setTimeout(() => {
          this.isAddBookmarkLoading = false
          this.bookmarkAlertNextBtnText = 'Добавить'
          this.bookmarkAlertStep = 2
        }, 5000)
      } else if (isSecondStep) {
        const data = new FormData()
        data.append('url', this.url)
        data.append('title', this.title)
        data.append('desc', this.desc)
        data.append('body', this.body)
        let isPrivate = '0'
        if (this.isPrivate) {
          isPrivate = '1'
        }
        data.append('private', isPrivate)
        data.append('user', this.user.id)
        let isUnreaded = '0'
        if (this.readLater) {
          isUnreaded = '1'
        }
        data.append('unreaded', isUnreaded)
        await this.$axios.$post('http://localhost:8000/api/bookmark/', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.articles.push({
          title: this.title,
          url: this.url,
          tags: [],
          body: 'hosting',
          isUnreaded: false
        })
        this.selectedArticles.push(false)
        this.articleExpanders.push(false)
        this.closeAlert()
        this.bookmarkAlertNextBtnText = 'Далее'
        this.bookmarkAlertStep = 1
        this.url = ''
        this.title = ''
        this.isPrivate = ''
        this.shareToGroup = ''
        this.shareToOutliner = ''
        this.tags = ''
        this.desc = ''
        this.readLater = ''
      }
    },
    edit (article, idx) {
      this.title = article.title
      this.url = article.url
      this.desc = article.desc
      this.tags = article.tags.join(' ')
      /*
       * TODO
       * isShareToOutliner
         * isShareToGroup
       */
      this.isPrivate = article.isPrivate
      this.isUnreaded = article.isUnreaded
      this.editDialog = true
      this.selectedArticleindex = idx
      this.shareToOutliner = article.outliners
      this.$forceUpdate()
    },
    async remove (index) {
      console.log(`article id: ${this.articles[index].id}`)
      const articleId = this.articles[index].id
      const data = {
        id: articleId
      }
      console.log(`data: ${JSON.stringify(data)}`)
      try {
        await this.$axios.$delete(`http://localhost:8000/api/bookmark/?id=${articleId}`, data, {
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
          }
        })
        this.articles = this.articles.filter((article, idx) => idx !== index)
        this.$forceUpdate()
      } catch (e) {
        /*
         *  TODO
         *  show error
         */
      }
    },
    getLink (article) {
      this.link = article.url
      this.shareLinkDialog = true
    },
    sendEmail (article) {
      this.markup = article.title
      this.sendEmailDialog = true
    },
    async markAsUnread (article) {
      const articleId = article.id
      const data = {}
      try {
        await this.$axios.$put(`http://localhost:8000/api/bookmark/mark/?id=${articleId}`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.$forceUpdate()
      } catch (e) {
        /*
         *  TODO
         *  show error
         */
      }
    },
    addInOutliner (article) {
      this.addToOutlinerDialog = true
    },
    shareGroup (article) {
      this.shareToGroupDialog = true
    },
    closeSheet () {
      this.sheet = !this.sheet
      this.selectedArticles.fill(false)
      this.$forceUpdate()
    },
    setItemPerPage (count) {
      this.itemsPerPage = count
    },
    getArticlesForPage (page) {
      return this.articles.filter((article, articleIdx) => {
        const aritcleNum = articleIdx + 1
        return articleIdx < page * this.itemsPerPage && aritcleNum > page * this.itemsPerPage - this.itemsPerPage
      })
    },
    setVisibility (val) {
      this.visibility = val
    },
    setDate (val) {
      this.date = val
    },
    selectAll () {
      this.selectedArticles.fill(true)
      this.$forceUpdate()
    },
    toggleTag (index) {
      this.isAddTag[index] = !this.isAddTag[index]
      this.$forceUpdate()
    },
    toggleExpanders () {
      if (this.articleExpanders.length) {
        const articleExpanderVal = !this.articleExpanders[0]
        this.articleExpanders.fill(articleExpanderVal)
        this.$forceUpdate()
      }
    },
    async saveEdit () {
      const data = new FormData()
      data.append('id', this.articles[this.selectedArticleindex].id)
      data.append('url', this.url)
      data.append('title', this.title)
      data.append('desc', this.desc)
      data.append('body', this.body)
      let isPrivate = '0'
      if (this.isPrivate) {
        isPrivate = '1'
      }
      data.append('private', isPrivate)
      data.append('user', '-1')
      try {
        await this.$axios.$put(
          // `http://localhost:8000/api/bookmark/?id=${this.articles[this.selectedArticleindex].id}&url=${this.url}&title=${this.title}&desc=${this.desc}&body=${this.body}&private=${isPrivate}`
          'http://localhost:8000/api/bookmark/',
          data,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
        this.articles[this.selectedArticleindex].title = this.title
        this.articles[this.selectedArticleindex].url = this.url
        this.articles[this.selectedArticleindex].desc = this.desc
        this.articles[this.selectedArticleindex].tags = this.tags.split(' ')
        this.articles[this.selectedArticleindex].isPrivate = this.isPrivate
        this.articles[this.selectedArticleindex].readLater = this.readLater
        this.closeEditAlert()
        this.$forceUpdate()
      } catch (e) {
        /*
         * TODO
         * show error
         */
      }
    },
    shareLink () {
      this.closeShareLinkAlert()
    },
    closeShareLinkAlert () {
      this.shareLinkDialog = false
      this.link = ''
    },
    send () {
      this.closeSendEmailAlert()
    },
    closeSendEmailAlert () {
      this.sendEmailDialog = false
      this.to = ''
      this.subject = ''
      this.msg = ''
      this.markup = ''
      this.emails = []
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
