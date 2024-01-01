<template>
  <div style="width: 100%;">
    <v-toolbar
      height="75"
      style="width: 100%;"
      fixed
      color="cyan"
      class="overflow-hidden">
      <v-toolbar-title>
        <v-row align="center">
          <v-col>
            <v-avatar class="mt-5" color="info" size="75">
              <v-img :src="avatar" @error="handleAcceptAvatarError" />
            </v-avatar>
          </v-col>
          <v-col v-if="user">
            <p>{{user.name}}</p>
            <p>{{`Участвует с ${getDate()}`}}</p>
          </v-col>
        </v-row>
      </v-toolbar-title>
      <v-spacer />
      <v-col cols="4">
        <v-text-field dense prepend-icon="mdi-magnify" append-icon="mdi-menu-down" placeholder="Поиск...">
        </v-text-field>
      </v-col>
    </v-toolbar>
    <v-col cols="12">
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
        </div>
        <div
          v-else
          class="ma-5 text-center">
          <img src="https://www.diigo.com/asset/images/noitem_cartoon.png" alt="Не найдено" />
          <p>Статей нет!</p>
          <p>Вы можее добавить ее сами.</p>
        </div>
        <v-row class="mx-0">
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
              <v-col cols="4">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
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
    </v-col>
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
            <v-select v-model="shareToOutliner" placeholder="Поделиться в иерархии">
              <template #no-data>
                <p class="ma-3">Вы еще не добавили ни одной иерархии.</p>
              </template>
            </v-select>
            <v-select v-model="shareToGroup" placeholder="Поделиться в группе">
              <template #no-data>
                <p class="ma-3">Вы еще не добавили ни одной группы.</p>
              </template>
            </v-select>
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
            <p class="mx-2">Редактировать элемент</p>
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
            <p class="mx-2">Поделиться страницей</p>
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
            <p class="text-transform-unset mx-2">Отправить на почту</p>
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
                  v-model="emailVals[index]"
                  @click:close="removeEmail(index)">
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
            <p class="mx-2">Добавить элемент в структуру</p>
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
            <p class="mx-2">Добавить элемент в группу</p>
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
import { mapActions } from 'vuex'

export default {
  layout: 'personal',
  async asyncData ({ $axios, $store, $router }) {
    try {
      console.log(`$store.state.token: ${$store.state.token}`)
      const response = await $axios.$get('http://localhost:8000/api/bookmarks', {
        headers: {
          Authorization: $store.state.token
        }
      })
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
      // const suggestions = bookmarks.map(bookmark => bookmark.title)
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
    const articles = ref([])
    const itemsPerPage = ref(24)
    const page = ref(1)
    const isLoading = ref(true)
    const date = ref('Дата создания')
    const selectedArticles = ref([])
    const articleExpanders = ref([])
    const sheet = ref(false)
    const isAddTag = ref([])
    const shareToOutliner = ref([])
    const shareToGroup = ref([])
    const isPrivate = ref(false)
    const readLater = ref(false)
    const editDialog = ref(false)
    const isShowNotification = ref(false)
    const notificationContent = ref('')
    const isUnreaded = ref(false)
    const selectedArticleindex = ref(-1)
    const shareToGroupDialog = ref(false)
    const msg = ref('')
    const sendEmailDialog = ref(false)
    const dialog = ref(false)
    const bookmarkAlertStep = ref(1)
    const isAddBookmarkLoading = ref(false)
    const url = ref('')
    const title = ref('')
    const desc = ref('')
    const tags = ref('')
    const shareLinkDialog = ref(false)
    const link = ref('')
    const addToOutlinerDialog = ref(false)
    const bookmarkAlertNextBtnText = ref('Далее')
    const subject = ref('')
    const to = ref('')
    const markup = ref('')
    const avatar = ref(null)
    return {
      articles,
      itemsPerPage,
      page,
      isLoading,
      date,
      selectedArticles,
      articleExpanders,
      sheet,
      isAddTag,
      shareToOutliner,
      shareToGroup,
      isPrivate,
      readLater,
      editDialog,
      isShowNotification,
      notificationContent,
      isUnreaded,
      selectedArticleindex,
      shareToGroupDialog,
      msg,
      sendEmailDialog,
      dialog,
      bookmarkAlertStep,
      isAddBookmarkLoading,
      url,
      title,
      desc,
      tags,
      shareLinkDialog,
      link,
      addToOutlinerDialog,
      bookmarkAlertNextBtnText,
      subject,
      to,
      markup,
      avatar
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    token () {
      return this.$store.state.token
    }
  },
  mounted () {
    // TODO: distribute for other pages
    this.authGuard()
    this.storeGuard()
    this.avatar = `http://localhost:8000/user/avatar/?id=${this.user.id}`
  },
  methods: {
    ...mapActions([
      'setUser',
      'setToken'
    ]),
    getPageCount () {
      const articlesCount = this.articles.length
      const pages = Math.ceil(articlesCount / this.itemsPerPage)
      return pages
    },
    storeGuard () {
      console.log(`$store.state.user: ${this.$store.state.user}`)
      if (!this.$store.state.user) {
        return this.$router.push({ path: '/start' })
      }
    },
    async authGuard () {
      try {
        if (!this.token) {
          const token = localStorage.getItem('token')
          if (token) {
            await this.setToken(token)
          } else {
            this.$router.push({ path: '/start' })
          }
        }
        const response = await this.$axios.$get('http://localhost:8000/api/user/token', {
          headers: {
            Authorization: this.token
          }
        })
        const user = response.user
        if (user) {
          await this.setUser(user)
          this.getArticles()
        } else {
          this.$router.push({ path: '/start' })
        }
      } catch (e) {
        /*
         * TODO
         * show error
         */
      }
    },
    async getArticles (isUnreaded = null) {
      this.isLoading = true
      try {
        const response = await this.$axios.$get(`http://localhost:8000/api/bookmarks/?${isUnreaded ? 'unreaded=true' : ''}`, {
          headers: {
            Authorization: this.token
          }
        })
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
              date: moment(bookmark.date).locale('ru').format('MMMM D, YYYY')
            }
          })
        }
        const selected = []
        const expanders = []
        for (let i = 0; i < bookmarks.length; i++) {
          selected.push(false)
          expanders.push(false)
        }
        this.isLoading = bookmarks.length <= 0
        this.articles = bookmarks
        this.selectedArticles = selected
        this.articleExpanders = expanders
      } catch (e) {
      }
    },
    getArticlesForPage (page) {
      return this.articles.filter((article, articleIdx) => {
        const aritcleNum = articleIdx + 1
        return articleIdx < page * this.itemsPerPage && aritcleNum > page * this.itemsPerPage - this.itemsPerPage
      })
    },
    toggleArticleSelection (idx) {
      if (this.sheet) {
        this.selectedArticles[idx] = !this.selectedArticles[idx]
        this.$forceUpdate()
      }
    },
    setDate (val) {
      this.date = val
    },
    toggleTag (index) {
      this.isAddTag[index] = !this.isAddTag[index]
      this.$forceUpdate()
    },
    isHaveOutliners (article) {
      let isHave = false
      const articleOutliners = article.outliners
      if (articleOutliners) {
        isHave = articleOutliners.length
      }
      return isHave
    },
    getArticleOutliners (article) {
      if (!article.outliners) {
        return []
      }
      return article.outliners.map(outliner => outliner.name).join(',')
    },
    getDate () {
      return moment(this.user.date).locale('ru').format('MMMM D, YYYY')
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
            Authorization: this.token,
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
    closeSheet () {
      this.sheet = !this.sheet
      this.selectedArticles.fill(false)
      this.$forceUpdate()
    },
    selectAll () {
      this.selectedArticles.fill(true)
      this.$forceUpdate()
    },
    share () {
      this.closeShareToGroupAlert()
    },
    closeShareToGroupAlert () {
      this.shareToGroupDialog = false
    },
    send () {
      this.closeSendEmailAlert()
    },
    closeSendEmailAlert () {
      this.sendEmailDialog = false
    },
    closeAlert () {
      this.dialog = false
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
        this.isAddBookmarkLoading = true
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
        // data.append('user', this.user.id)
        let isUnreaded = '0'
        if (this.readLater) {
          isUnreaded = '1'
        }
        data.append('unreaded', isUnreaded)
        await this.$axios.$post('http://localhost:8000/api/bookmark/', data, {
          headers: {
            Authorization: this.token,
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
        this.isAddBookmarkLoading = false
      }
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
      try {
        await this.$axios.$put(
          'http://localhost:8000/api/bookmark/',
          data,
          {
            headers: {
              Authorization: this.token,
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
    shareGroup () {
      this.shareToGroupDialog = true
    },
    addInOutliner () {
      this.addToOutlinerDialog = true
    },
    add () {
      this.closeAddToOutlinerAlert()
    },
    closeAddToOutlinerAlert () {
      this.addToOutlinerDialog = false
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
    sendEmail (article) {
      this.markup = article.title
      this.sendEmailDialog = true
    },
    handleAcceptAvatarError () {
      this.avatar = '@/assets/img/default_user_photo.gif'
    }
  }
}
</script>

<style>

</style>
