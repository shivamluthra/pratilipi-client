<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Employee Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="username"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <span>Not a member yet? Click <router-link to="/signup">here</router-link> to Register</span>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
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
  export default {
    data: () => ({
      drawer: null,
      username: null,
      password: null
    }),
    props: {
      source: String
    },
    beforeCreate() {
      if (this.$session.exists()) {
        let userId = this.$session.get('userId')
        console.log("USER ID: ", userId)
        this.$router.push({name: 'Profile', params: {id: userId}})
      }
    },
    methods: {
      login: async function () {
        let user = {
          username: this.username,
          password: this.password
        }
        await employeeService.login(user).then(res => {
          if (res.status === 200 && res.data.id) {
            this.$session.start()
            this.$session.set('jwt', res.data.id)
            this.$session.set('userId', res.data.userId)
            // this.http.headers.common['Authorization'] = 'Bearer ' + res.data.id
            this.$router.push({params: {id: res.data.userId}, name: 'Profile'});
          }
        }).catch(err => {
          throw err;
        })
      }
    }
  }
</script>
