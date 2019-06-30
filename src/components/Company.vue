<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-text>
                <v-flex class="text-xs-center pa-2">
                  <v-avatar size="200px">
                    <v-img
                    :src="`${company.logo}`"
                    class="grey lighten-2"
                    ></v-img>
                  </v-avatar>
                </v-flex>
                <v-flex class="text-xs-center pa-2">
                  <h2>{{ company.name }}</h2>
                </v-flex>
                <v-flex class="text-xs-center">
                  <h4>{{ company.address }}</h4>
                </v-flex>
                <v-flex class="text-xs-center pa-2">
                  <h6>This page has been visited {{ company.reach }} times.</h6>
                </v-flex>
              </v-card-text>
            </v-card>
            <v-btn absolute top right class="primary mt-5" @click="logout">Logout</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {companyService} from '../providers/company.service'
  export default {
    data: () => ({
      drawer: null,
      employeeId: null,
      companyId: null,
      company: null
    }),
    props: {
      source: String
    },
    created() {
      this.employeeId = this.$route.params.employeeId;
      this.companyId = this.$route.params.companyId;
      if (this.employeeId && this.companyId) {
        this.company = this.$route.params.company;
        (async () => {
          await companyService.incrementCompanyReach(this.companyId).then(res => {
            res;
          }).catch(err => {
            throw err;
          })
        })()
      } else {
        this.$router.push({name: 'NotFound'});
      }
    },
    methods: {
      logout: async function () {
        this.$session.destroy()
        this.$router.push('/')
      }
    }
  }
</script>
