<template>
  <div>
    <v-toolbar
      height="75"
      style="width: 100%;"
      fixed
      color="cyan">
      <v-toolbar-title>
        <v-row align="center">
          <v-col>
            <p>Подписки</p>
          </v-col>
        </v-row>
      </v-toolbar-title>
    </v-toolbar>
    <div>
      <v-alert class="ma-3" color="#ccc">Самоотверженность нашей команды обеспечила постоянное совершенствование Bookmarker на протяжении последних десяти лет, в то время как десятки аналогичных сервисов были закрыты. Ваша поддержка играет важную роль для будущего Bookmarker.</v-alert>
      <p class="text-center">Your current plan: <span class="font-weight-medium">Free</span></p>
      <v-data-table
        items-per-page="14"
        color="purple"
        :headers="[
          { title: 'name', align: 'center', key: 'name', value: 'name' },
          { title: 'standard', align: 'center', key: 'standard', value: 'standard' },
          { title: 'proffessional', align: 'center', key: 'proffessional', value: 'proffessional' },
          { title: 'bussiness', align: 'center', key: 'bussiness', value: 'bussiness' },
        ]"
        :items="[
          {
            id: 'NO_ADS',
            name: 'No Ads',
            standard: '*',
            proffessional: '*',
            bussiness: '*',
          },
          {
            id: 'UNLIMITED_CLOUD_COOKMARKS',
            name: 'Unlimited Cloud Bookmarks',
            standard: '*',
            proffessional: '*',
            bussiness: '*',
          },
          {
            id: 'UNLIMITED_WEBPAGE_AND_PDF_HIGHLIGHTS',
            name: 'Unlimited Webpage and PDF Highlights',
            standard: '*',
            proffessional: '*',
            bussiness: '*',
          },
          {
            id: 'UNLIMITED_IMAGE_STORAGE',
            name: 'Unlimited Image Storage',
            standard: '*',
            proffessional: '*',
            bussiness: '*',
          },
          {
            id: 'UNLIMITED_CACHED_PAGES',
            name: 'Unlimited Cached Pages (Webpage Backup)',
            standard: '*',
            proffessional: '*',
            bussiness: '*',
          },
          {
            id: 'IMPORT_KINDLE_HIGHLIGHTS_&_NOTES',
            name: 'Import kindle highlights & notes',
            standard: '*',
            proffessional: '*',
            bussiness: '*',
          },
          {
            id: 'UNLIMITED_PDF_STORAGE',
            name: 'Unlimited PDF Storage',
            standard: '',
            proffessional: '*',
            bussiness: '*',
          },
          {
            id: 'UNLIMITED_OUTLINERS',
            name: 'Unlimited Outliners',
            standard: '',
            proffessional: '*',
            bussiness: '*',
          },
          {
            id: 'ADVANCED_TEAM_FEATURES_FOR_YOUR_COMPANY',
            name: 'Advanced team features for your company',
            standard: '',
            proffessional: '',
            bussiness: '',
          },
          {
            id: 'UNLIMITED_TEAM_LIBRARY_STORAGE_FOR_WEBPAGE_PDF_AND_IMAGES',
            name: 'Unlimited team library storage for Webpage, PDF and Images',
            standard: '',
            proffessional: '',
            bussiness: '*',
          },
          {
            id: 'COLLABORATIVE_WEB_ANNOTATION_IN_TEAM',
            name: 'Collaborative Web annotation in Team',
            standard: '',
            proffessional: '',
            bussiness: '*',
          },
          {
            id: 'COLLABORATIVE_PDF_ANNOTATION_IN_TEAM',
            name: 'Collaborative PDF annotation in Team',
            standard: '',
            proffessional: '',
            bussiness: '*',
          },
          {
            id: 'ADMIN_CONSOLE_DASHBOARD',
            name: 'Admin console dashboard',
            standard: '',
            proffessional: '',
            bussiness: '*',
          },
          {
            id: 'UPGRADE',
            name: 'Upgrade',
            standard: 'Upgrade',
            proffessional: 'Upgrade',
            bussiness: 'Try for free',
          }
        ]">
        <template #[`item.standard`]={item}>
          <v-icon v-if="item.standard === '*'" color="blue">mdi-circle</v-icon>
          <v-btn v-else-if="item.standard.length" outlined color="blue">{{item.standard}}</v-btn>
        </template>
        <template #[`item.proffessional`]={item}>
          <v-icon v-if="item.proffessional === '*'" color="green">mdi-circle</v-icon>
          <v-btn v-else-if="item.proffessional.length" outlined color="green">{{item.proffessional}}</v-btn>
        </template>
        <template #[`item.bussiness`]={item}>
          <v-icon v-if="item.bussiness === '*'" color="green">mdi-circle</v-icon>
          <v-btn v-else-if="item.bussiness.length" outlined color="green">{{item.bussiness}}</v-btn>
        </template>
        <template #[`item.name`]={item}>
          <span :class="{'font-weight-bold': item.name === 'ADVANCED_TEAM_FEATURES_FOR_YOUR_COMPANY'}">{{item.name}}</span>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'personal',
  setup () {
    return {}
  },
  computed: {},
  async mounted () {
    // TODO: distribute for other pages
    await this.authGuard()
  },
  methods: {
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
</style>
