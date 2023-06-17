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
      <v-btn
        class="text-capitalize mx-4"
        color="transparent"
        elevation="0"
        @click="toggleExpanders">{{articleExpanders[0] ? 'Сжать все' : 'Расширить все'}}</v-btn>
      <v-btn
        class="text-capitalize mx-4"
        color="transparent"
        elevation="0"
        @click="sheet = !sheet">{{sheet ? 'Быстрое редактирование' : 'Массовое редактирование'}}</v-btn>
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
              v-for="(article, articleIdx) in getArticlesForPage(page)"
              :key="article"
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
                          class="clickable"
                          label
                          @click="addTag">+ Тэг</v-chip>
                      </v-col>
                  </v-row>
                  <p v-if="article.outliners.length">В <span class="font-weight-bold">структуре</span>: {{getArticleOutliners(article)}}</p>
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
            <p class="text-capitalize mx-2">Закладка</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeAlert">
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
          >{{bookmarkAlertNextBtnText}}</v-btn>
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
          <v-row>
            <v-text-field
              :value="link"
              disabled="true" />
            <v-btn
              variant="text"
              @click="shareLink"
            >Превью</v-btn>
          </v-row>
          <v-row>
            <v-icon class="mx-2">mdi-circle</v-icon>
            <v-icon class="mx-2">mdi-circle</v-icon>
            <v-icon class="mx-2">mdi-circle</v-icon>
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
            :value="to"
            disabled="true" />
          <v-text-field
            :value="subject"
            disabled="true" />
          <v-text-field
            :value="msg"
            disabled="true" />
          <v-btn
            variant="text"
            @click="send"
          >Отправить</v-btn>
          <v-text-field
            :value="markup"
            disabled="true" />
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
          <v-text-field
            :value="to"
            placeholder="Поделитесь в структуре" />
          <v-btn
            variant="text"
            @click="add"
          >Добавить</v-btn>
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
          <v-text-field
            :value="to"
            placeholder="Поделитесь в группе" />
          <v-btn
            variant="text"
            @click="share"
          >Поделиться</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-slide-y-transition class="w-100">
      <v-footer
        class="w-100"
        v-show="sheet"
        elevation="2"
        color="rgb(255, 255, 255)"
        app>
        <v-row
          class="w-100">
          <v-col
            cols="4"
            class="ma-5">
            <v-btn
              class="text-capitalize mx-2"
              color="transparent"
              elevation="0"
              @click="selectAll">Выбрать все</v-btn>
            <span class="mx-2">{{selectedArticles.filter(item => item).length}} элементов выбрано</span>
            <span
              class="mx-2"
              v-if="selectedArticles.filter(item => item).length <= 0">Щелкните на элемент чтобы выбрать</span>
          </v-col>
          <v-col
            cols="6"
            v-if="selectedArticles.filter(item => item).length > 0">
            <v-row>
              <v-btn>Организовать в структуре</v-btn>
              <v-btn>Поделиться в группе</v-btn>
              <v-btn>Отправить почту</v-btn>
              <v-btn>Создать отчет</v-btn>
              <v-btn>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col
            cols="1"
            class="ma-5">
            <v-btn @click="closeSheet">
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
      shareToGroupDialog
    }
  },
  mounted () {
    this.getArticleContent()
  },
  methods: {
    share () {
      this.closeShareToGroupAlert()
    },
    getArticleOutliners (article) {
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
    getArticleContent () {
      setTimeout(() => {
        // this.articles = []
        this.articles = [
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [
              'a',
              'b',
              'c'
            ],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          },
          {
            title: 'youtube',
            url: 'https://youtube.com',
            tags: [],
            body: 'hosting',
            isUnreaded: false,
            outliners: [
              {
                id: -1,
                name: 'A'
              }
            ],
            isPrivate: false
          }
        ]
        for (let i = 0; i < this.articles.length; i++) {
          this.selectedArticles.push(false)
          this.articleExpanders.push(false)
        }
        this.isLoading = false
      }, 3000)
    },
    next () {
      if (this.bookmarkAlertStep === 1) {
        this.bookmarkAlertNextBtnText = 'Добавить'
        this.bookmarkAlertStep = 2
      } else if (this.bookmarkAlertStep === 2) {
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
    remove (index) {
      this.articles = this.articles.filter((article, idx) => idx !== index)
      this.$forceUpdate()
    },
    getLink (article) {
      this.link = article.url
      this.shareLinkDialog = true
    },
    sendEmail (article) {
      this.markup = article.title
      this.sendEmailDialog = true
    },
    markAsUnread (article) {
      article.isUnreaded = !article.isUnreaded
      this.notificationContent = '1 элемент помечен как непрочитанный'
      this.isShowNotification = true
      setTimeout(() => {
        this.isShowNotification = false
        this.notificationContent = ''
      }, 2500)
      this.$forceUpdate()
    },
    addInOutliner (article) {
      this.addToOutlinerDialog = true
    },
    shareGroup (article) {
      this.shareToGroupDialog = true
    },
    closeSheet () {
      this.sheet = !this.sheet
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
    addTag () {
      alert('addTag')
    },
    toggleExpanders () {
      if (this.articleExpanders.length) {
        const articleExpanderVal = !this.articleExpanders[0]
        this.articleExpanders.fill(articleExpanderVal)
        this.$forceUpdate()
      }
    },
    saveEdit () {
      this.articles[this.selectedArticleindex].title = this.title
      this.articles[this.selectedArticleindex].url = this.url
      this.articles[this.selectedArticleindex].desc = this.desc
      this.articles[this.selectedArticleindex].tags = this.tags.split(' ')
      this.articles[this.selectedArticleindex].isPrivate = this.isPrivate
      this.articles[this.selectedArticleindex].readLater = this.readLater
      this.closeEditAlert()
      this.$forceUpdate()
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
