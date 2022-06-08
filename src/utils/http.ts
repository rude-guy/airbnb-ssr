import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const defaultConfig = {
  timeout: 5000,
  baseURL: import.meta.env.PROD ? 'http://110.42.184.111' : 'http://localhost:3000/release'
}

class Http {
  constructor () {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static axiosInstance = axios.create(defaultConfig)

  private httpInterceptorsRequest () {
    Http.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    }, error => {
      return Promise.reject(error)
    })
  }

  private httpInterceptorsResponse () {
    Http.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      return response
    }, error => {
      return Promise.reject(error)
    })
  }

  public httpGet<T> (url: string, params: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance.get(url, { params }).then(res => res.data).catch()
  }

  public httpPost<T> (url: string, params: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance.post(url, params).then(res => res.data).catch()
  }
}

export const http = new Http()
