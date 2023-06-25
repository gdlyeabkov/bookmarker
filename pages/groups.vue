<template>
  <div style="width: 100%;">
    <v-toolbar
      height="75"
      style="width: 100%;"
      fixed
      color="cyan">
      <v-toolbar-title>
        <v-btn class="text-capitalize mx-2" color="transparent" elevation="0">Мои группы</v-btn>
      </v-toolbar-title>
    </v-toolbar>
    <v-row v-if="currentTab === 0">
      <v-col cols="8">
        <v-container class="mx-5">
          <p class="title">Мои группы</p>
          <p>Вы еще не присоединились и не создали ни одной группы.</p>
        </v-container>
      </v-col>
      <v-col cols="4">
        <v-container class="mx-5">
          <v-card>
            <v-card-title>Создайте группу за 2 простых шага</v-card-title>
            <v-card-text>
              <v-btn @click="create">Создать новую группу</v-btn>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
    <v-form v-else-if="currentTab === 1">
      <p>Создать группу</p>
      <v-row>
        <p>Имя группы:</p>
        <v-text-field />
      </v-row>
      <v-row>
        <p>URL группы:</p>
        <v-text-field />
      </v-row>
      <v-row>
        <p>Описание:</p>
        <v-textarea />
      </v-row>
      <v-row>
        <p>Категории:</p>
        <v-radio-group>
          <v-row>
            <v-radio
              label="Бизнес и финансы"
              value="1" />
            <v-radio
              label="Компьютеры и Интернет"
              value="1" />
          </v-row>
          <v-row>
            <v-radio
              label="Культура и общественные развлечения и искусство"
              value="1" />
            <v-radio
              label="Семейные и домашние игры"
              value="1" />
          </v-row>
          <v-row>
            <v-radio
              label="Правительство и политика"
              value="1" />
            <v-radio
              label="Здоровье и благополучие"
              value="1" />
          </v-row>
          <v-row>
            <v-radio
              label="Коллекционирование и хобби"
              value="1" />
            <v-radio
              label="Музыка"
              value="1" />
          </v-row>
          <v-row>
            <v-radio
              label="Отдых и спорт"
              value="1" />
            <v-radio
              label="Религия и вероисповедания"
              value="1" />
          </v-row>
          <v-row>
            <v-radio
              label="Романтика и отношения"
              value="1" />
            <v-radio
              label="Школы и образование"
              value="1" />
          </v-row>
          <v-row>
            <v-radio
              label="Образование - K12 Наука"
              value="1" />
            <v-radio
              label="Видео путешествия"
              value="1" />
          </v-row>
          <v-radio
            label="Не классифицировано"
            value="1" />
        </v-radio-group>
      </v-row>
      <v-row>
        <p>Кто может просматривать?</p>
        <v-col>
          <v-radio-group>
            <v-radio
              label="Вы не можете создавать новые общедоступные группы из-за вашего тарифного плана."
              value="1" />
            <v-radio
              label="Частный - только участники группы могут просматривать"
              value="1" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <p>Доступна для поиска?</p>
        <v-col>
          <v-radio-group>
            <v-radio
              label="Вывести эту группу в результаты поиска"
              value="1" />
            <v-radio
              label="Не указывать эту группу"
              value="1" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <p>Как присоединиться?</p>
        <v-col>
          <v-radio-group>
            <v-radio
              label="Открытый — любой может присоединиться (доступно только для общедоступной группы)"
              value="1" />
            <v-radio
              label="Подать заявку на вступление — требуется одобрение модератора"
              value="1" />
            <v-radio
              label="Только по приглашению"
              value="1" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <p>Кто может пригласить новых участники?</p>
        <v-col>
          <v-radio-group>
            <v-radio
              label="Только модератор группы"
              value="1" />
            <v-radio
              label="Все участники группы"
              value="1" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row class="my-5" justify="space-around">
        <v-btn @click="currentTab = 0">Создать группу</v-btn>
        <v-btn
          color="transparent"
          elevation="0"
          @click="currentTab = 0">Назад</v-btn>
      </v-row>
    </v-form>
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
            :value="to"
            placeholder="Используте Enter для добавления нескольких E-mail" />
          <v-text-field
            :value="subject"
            placeholder="Тема" />
          <v-textarea
            :value="msg"
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
    const currentTab = ref(0)
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
    return {
      currentTab,
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
      suggestions
    }
  },
  mounted () {
    this.getArticleContent()
  },
  methods: {
    create () {
      this.currentTab = 1
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
      this.isLoading = true
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
        this.articles = this.articles.filter((item) => {
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
