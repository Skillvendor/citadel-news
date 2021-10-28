import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export default class StandardRequest {
  constructor(serverName) {
    this.servername = serverName
  }

  get = async (url, headers) => await axios(`${this.servername}/${url}`, headers);

  axiosFormActionDefaults = ({ url, method, params = {} }) => ({
    method,
    url,
    data: params,
  })

  post = async (url, params) => await axios(this.axiosFormActionDefaults({
      url: `${this.servername}/${url}`,
      method: 'POST',
      params
    }));

  del = async (url) => await axios(this.axiosFormActionDefaults({
      url: `${this.servername}/${url}`,
      method: 'DELETE',
    }))

  put = async (url, params) => await axios(this.axiosFormActionDefaults({
      url: `${this.servername}/${url}`,
      method: 'PUT',
      params
    }))
}
