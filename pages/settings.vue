<template>
  <div>
    <input class="d-none" type="file" accept="image/*" ref="fileInputRef" @change="handleAvatarUpload" />
    <v-toolbar
      height="75"
      style="width: 100%;"
      fixed
      color="cyan">
      <v-toolbar-title>
        <v-row align="center">
          <v-col>
            <p>Настройки</p>
          </v-col>
        </v-row>
      </v-toolbar-title>
    </v-toolbar>
    <div>
      <div class="px-10">
        <v-row justify="space-between" class="ma-0 py-5">
          <v-col cols="3">
            <span class="font-weight-medium">Профиль</span>
          </v-col>
          <v-col cols="3">
            <span>Аватар</span>
          </v-col>
          <v-col cols="3">
            <v-avatar color="info" size="24">
              <v-img :src="avatar" @error="handleAcceptAvatarError" />
            </v-avatar>
          </v-col>
          <v-col cols="3">
            <span class="changeBtn" @click="changeAvatarOnClick">Сменить аватарку</span>
          </v-col>
        </v-row>
        <v-divider />
      </div>
      <div class="px-10">
        <v-row justify="space-between" class="ma-0 py-5">
          <v-col cols="3" />
          <v-col cols="3">
            <span>Имя</span>
          </v-col>
          <v-col cols="3" />
          <v-col cols="3">
            <span class="changeBtn" @click="changeNameOnClick">Сменить имя</span>
          </v-col>
        </v-row>
        <v-divider />
      </div>
      <div class="px-10">
        <v-row justify="space-between" class="ma-0 py-5">
          <v-col cols="3">
            <span class="font-weight-medium">Аккаунт</span>
          </v-col>
          <v-col cols="3">
            <span>E-mail</span>
          </v-col>
          <v-col cols="3">
            <span></span>
          </v-col>
          <v-col cols="3">
            <span class="changeBtn" @click="changeEmailOnClick">Сменить E-mail</span>
          </v-col>
        </v-row>
        <v-divider />
      </div>
      <div class="px-10">
        <v-row justify="space-between" class="ma-0 py-5">
          <v-col cols="3" />
          <v-col cols="3">
            <span>Пароль</span>
          </v-col>
          <v-col cols="3" />
          <v-col cols="3">
            <span class="changeBtn" @click="changePasswordOnClick">Сменить пароль</span>
          </v-col>
        </v-row>
        <v-divider />
      </div>
      <div class="px-10">
        <v-row justify="space-between" class="ma-0 py-5">
          <v-col cols="3">
            <span class="font-weight-medium">Удалить аккаунт</span>
          </v-col>
          <v-col cols="3">
            <span class="deleteAccountBtn" @click="deleteAccountOnClick">Я хочу удалить аккаунт</span>
          </v-col>
          <v-col cols="3" />
          <v-col cols="3" />
        </v-row>
      </div>
    </div>
    <v-dialog
      v-model="changeNameDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2 white--text">Сменить имя</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon
            color="white"
            @click="closeChangeNameAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="name" placeholder="Введите новое имя от 6 до 16 символов" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            color="#0000FF"
            class="white--text"
            @click="saveName">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="changeEmailDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2 white--text">Сменить E-mail</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon
            color="white"
            @click="closeChangeEmailAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="password" placeholder="Пароль" />
          <v-text-field v-model="email" placeholder="Новый E-mail" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            color="#0000FF"
            class="white--text"
            @click="saveEmail">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="changePasswordDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2 white--text">Сменить пароль</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon
            color="white"
            @click="closeChangePasswordAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="password" placeholder="Пароль" />
          <v-text-field v-model="newPassword" placeholder="Новый пароль, не менее 6 символов" />
          <v-text-field v-model="confirmNewPassword" placeholder="Повторите новый пароль" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            color="#0000FF"
            class="white--text"
            @click="savePassword">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteAccountDialog"
      width="50%">
      <v-card>
        <v-toolbar
          color="primary">
          <v-toolbar-title>
            <p class="text-capitalize mx-2 white--text">Удалить аккаунт</p>
          </v-toolbar-title>
          <v-spacer />
          <v-icon
            color="white"
            @click="closeDeleteAccountAlert">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            color="#FF2222"
            class="white--text"
            @click="deleteAccount">
            Вы подтвердаете удаление?
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapActions } from 'vuex'

export default {
  layout: 'personal',
  setup () {
    const changeNameDialog = ref(false)
    const changeEmailDialog = ref(false)
    const changePasswordDialog = ref(false)
    const deleteAccountDialog = ref(false)
    const name = ref('')
    const password = ref('')
    const email = ref('')
    const newPassword = ref('')
    const confirmNewPassword = ref('')
    const avatar = ref(null)
    return {
      changeNameDialog,
      changeEmailDialog,
      changePasswordDialog,
      deleteAccountDialog,
      name,
      password,
      email,
      newPassword,
      confirmNewPassword,
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
  },
  methods: {
    ...mapActions([
      'setUser',
      'setToken'
    ]),
    changeAvatarOnClick () {
      this.$refs.fileInputRef.click()
    },
    changeNameOnClick () {
      this.changeNameDialog = true
    },
    changeEmailOnClick () {
      this.changeEmailDialog = true
    },
    changePasswordOnClick () {
      this.changePasswordDialog = true
    },
    deleteAccountOnClick () {
      this.deleteAccountDialog = true
    },
    closeChangeNameAlert () {
      this.changeNameDialog = false
    },
    closeChangeEmailAlert () {
      this.changeEmailDialog = false
    },
    closeChangePasswordAlert () {
      this.changePasswordDialog = false
    },
    closeDeleteAccountAlert () {
      this.deleteAccountDialog = false
    },
    saveName () {
      this.closeChangeNameAlert()
    },
    saveEmail () {
      this.closeChangeEmailAlert()
    },
    savePassword () {
      this.closeChangePasswordAlert()
    },
    deleteAccount () {
      this.closeDeleteAccountAlert()
    },
    handleAvatarUpload (e) {
      this.avatar = URL.createObjectURL(e.target.files[0])
    },
    handleAcceptAvatarError () {
      this.avatar = 'https://resources.diigo.com/images/avatar/user/nickfish2020_96.jpg?rand=863'
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
        } else {
          this.$router.push({ path: '/start' })
        }
      } catch (e) {
        /*
         * TODO
         * show error
         */
      }
    }
  }
}
</script>

<style>
  .changeBtn {
    cursor: pointer;
    color: rgb(13, 144, 158);
  }
  .deleteAccountBtn {
    cursor: pointer;
    color: rgb(219, 58, 58);
  }
</style>
