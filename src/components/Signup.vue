<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Employee Registration</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="name" label="Name" type="text" v-model="name"></v-text-field>
                  <v-text-field prepend-icon="verified_user" name="username" label="Username" type="text" v-model="username"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                  <v-text-field prepend-icon="image" name="image" label="Image(URL)" type="text" v-model="image"></v-text-field>
                  <v-select :items="companyNames" label="Select Company" outline v-model="selectedCompany"></v-select>
                  <v-text-field prepend-icon="card_membership" name="designation" label="Designation" type="text" v-model="designation"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="createEmployee">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {employeeService} from '../providers/employee.service'
  import {companyService} from '../providers/company.service'
  export default {
    data: () => ({
      drawer: null,
      name: null,
      username: null,
      image: null,
      password: null,
      designation: null,
      companies: [],
      companyNames: [],
      selectedCompany: null,
      companyId: null
    }),
    props: {
      source: String
    },
    beforeCreate() {
      (async () => {
        await companyService.fetchCompanies().then(res => {
          for (let i = res.data.length - 1; i >= 0; i--) {
            this.companies.push(res.data[i])
            this.companyNames.push(res.data[i].name)
          }
        }).catch(err => {
          throw err;
        })
      })()
    },
    methods: {
      createEmployee: async function () {
        let employee = {
          name: this.name,
          username: this.username,
          image: this.image,
          password: this.password,
          designation: this.designation
        }
        this.companies.forEach(company => {
          if (company.name === this.selectedCompany) {
            this.companyId = company.id;
          }
        })
        await employeeService.createCompanyEmployee(this.companyId, employee).then(() => {
          this.$router.push({name: 'Login'})
        }).catch(err => {
          throw err;
        })
      }
    }
  }
</script>
