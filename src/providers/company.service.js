import {AuthClient} from './endpoint.service'

export const companyService = {
  fetchCompanies: async function () {
    return new Promise((resolve, reject) => {
      AuthClient.get(`/companies`)
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
    })
  },
  incrementCompanyReach: async function (companyId) {
    return new Promise((resolve, reject) => {
      AuthClient.get(`/companies/${companyId}`)
      .then((res) => {
        let body = {
          reach: res.data.reach + 1
        }
        AuthClient.patch(`/companies/${companyId}`, body)
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
      })
      .catch((e) => {
        reject(e)
      })
    })
  }
}
