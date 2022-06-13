import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'

const defaultConfig = {
  timeout: 5000,
  baseURL: import.meta.env.PROD ? 'http://localhost:3001' : 'http://localhost:3000/release'
}

class Http {
  constructor () {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static axiosInstance = axios.create(defaultConfig)

  private httpInterceptorsRequest () {
    Http.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (!import.meta.env.SSR) {
        const token = localStorage.getItem('token')
        if (token) {
          // @ts-ignore
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
  }

  private httpInterceptorsResponse () {
    Http.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      return response
    }, error => {
      if (error.response?.data?.success === false) {
        return Promise.resolve(error.response)
      }
      return Promise.reject(error)
    })
  }

  public async httpGet<T> (url: string, params?: AxiosRequestConfig): Promise<T> {
    const loading = ElLoading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.1)'
    })
    return Http.axiosInstance.get(url, { params }).then(res => {
      return res.data
    }).finally(loading?.close)
  }

  public async httpPost<T> (url: string, params?: AxiosRequestConfig): Promise<T> {
    const loading = ElLoading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.1)'
    })
    return Http.axiosInstance.post(url, params).then(res => {
      return res.data
    }).finally(loading?.close)
  }

  public async httpPatch<T> (url: string, params?: AxiosRequestConfig): Promise<T> {
    const loading = ElLoading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.1)'
    })
    return Http.axiosInstance.patch(url, params).then(res => {
      return res.data
    }).finally(loading?.close)
  }
}

export const http = new Http()
