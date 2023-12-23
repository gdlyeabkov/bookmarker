<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid class="full-w non-pad">
        <Nuxt />
      </v-container>
    </v-main>
    <v-speed-dial
      :bottom="true"
      :right="true">
      <template v-slot:activator>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="gray darken-2"
              dark
              fab
              absolute
              right>
              <v-icon>mdi-chat</v-icon>
            </v-btn>
          </template>
          <v-card min-width="300">
            <v-list>
              <v-list-item
                prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                title="John Leider"
                subtitle="Founder of Vuetify"
              >
                <template v-slot:append>
                  <v-btn
                    variant="text"
                    :class="fav ? 'text-red' : ''"
                    icon="mdi-heart"
                    @click="fav = !fav"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-switch
                  v-model="message"
                  color="purple"
                  label="Enable messages"
                  hide-details
                ></v-switch>
              </v-list-item>

              <v-list-item>
                <v-switch
                  v-model="hints"
                  color="purple"
                  label="Enable hints"
                  hide-details
                ></v-switch>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                variant="text"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                variant="text"
                @click="menu = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </template>
    </v-speed-dial>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style scoped>
  .full-w {
    width: 100%;
  }

  .non-pad {
   padding: 0px;
  }

  .clickable {
    cursor: pointer;
  }
</style>
