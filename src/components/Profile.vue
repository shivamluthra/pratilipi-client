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
                    :src="`${employeeImage}`"
                    class="grey lighten-2"
                    ></v-img>
                  </v-avatar>
                </v-flex>
                <v-flex class="text-xs-center pa-2">
                  <h2>{{ employeeName }}</h2>
                </v-flex>
                <v-layout row>
                  <v-flex class="text-xs-center">
                    <h3 style="cursor: pointer" @click="routeToCompany">{{ employeeDesignation }} @ {{ employeeCompany.name }}</h3>
                  </v-flex>
                </v-layout>
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
  import {employeeService} from '../providers/employee.service'
  export default {
    data: () => ({
      drawer: null,
      employeeId: null,
      employeeName: null,
      employeeImage: null,
      employeeCompany: null,
      employeeDesignation: null
    }),
    props: {
      source: String
    },
    created() {
      this.employeeId = this.$route.params.id;
      if (this.employeeId) {
        (async () => {
          await employeeService.fetchEmployee(this.employeeId).then(res => {
            this.employeeName = res.data.name;
            this.employeeImage = res.data.image;
            this.employeeDesignation = res.data.designation;
            this.employeeCompany = res.data.company;
          }).catch(err => {
            this.$router.push({name: 'NotFound'});
            throw err;
          })
        })()
      } else {
        this.$router.push({name: 'NotFound'});
      }
    },
    beforeCreate() {
      if (!this.$session.exists()) {
        this.$router.push('/')
      }
    },
    methods: {
      routeToCompany: async function () {
        this.$router.push({name: 'Company', params: {employeeId: this.employeeId, companyId: this.employeeCompany.id, company: this.employeeCompany}})
      },
      logout: async function () {
        this.$session.destroy()
        this.$router.push('/')
      }
    }
  }
</script>
