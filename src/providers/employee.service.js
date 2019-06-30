import {AuthClient} from './endpoint.service'

export const employeeService = {
  createCompanyEmployee: async function (companyId, data) {
    return new Promise((resolve, reject) => {
      AuthClient.post(`companies/${companyId}/employees`, data)
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
    })
  },
  login: async function (data) {
    return new Promise((resolve, reject) => {
      AuthClient.post(`/employees/login`, data)
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
    })
  },
  fetchEmployee: async function (employeeId) {
    return new Promise((resolve, reject) => {
      AuthClient.get(`/employees/${employeeId}?filter[include]=company`)
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
    })
  }
}
