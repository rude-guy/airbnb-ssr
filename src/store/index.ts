import { InjectionKey } from 'vue'
import { createStore, Store, useStore as useBaseStore } from 'vuex'
import { getCities, saveLanguageApi } from '@/api/layout'
import { IRoomDetailParams, IRoomListParams } from '@/api/interface'
import { fetchRoomList } from '@/api/home'
import { fetchDetail } from '@/api/detail'

// 为 store state 声明类型
export interface AllStateTypes {
  count: number
  locale: any
  userStatus: number
  roomList: Array<any>
  pageNo: number
  pageSize: number
  total: number
  cityId: string
  roomDetail: any,
  roomId: string,
  orderVisible: boolean,
  cities: {
    _id: string,
    cityId: string,
    cityName: string
  }[],
  userInfo: any
}

// 定义 injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol('storeKey')

export function useStore () {
  return useBaseStore(key)
}

export function createSSRStore () {
  return createStore<AllStateTypes>({
    state: {
      count: 1,
      locale: null, // 语音包
      userStatus: 0, // 登录态
      roomList: [],
      pageNo: 1,
      pageSize: 6,
      total: 0,
      cityId: '',
      roomDetail: {},
      roomId: '',
      orderVisible: false,
      cities: [],
      userInfo: {}
    },
    mutations: {
      setCount (state, payload) {
        state.count += payload
      },
      setLanguage (state, payload) { // 设置语言包
        state.locale = payload
      },
      setUserStatus (state, payload) { // 设置登录状态
        state.userStatus = payload
      },
      setRoomList (state, payload) { // 设置房屋列表数据
        state.roomList = payload
      },
      setRoomDetail (state, payload) { // 设置房屋详情数据
        state.roomDetail = payload
      },
      setRoomId (state, payload) { // 设置房屋详情 id
        state.roomId = payload
      },
      setOrderVisible (state, payload) { // 设置房屋详情 id
        state.orderVisible = payload
      },
      setCities (state, payload) {
        state.cities = payload
      },
      setUserInfo (state, payload) {
        state.userInfo = payload
      }
    },
    actions: {
      fetchCount ({
        commit,
        state
      }, payload) {
        setTimeout(() => {
          commit('setCount', payload)
        }, 1000)
      },
      saveLanguage ({ commit }, language: any) {
        saveLanguageApi(language.name).then(res => {
          const { success } = res
          if (success) {
            commit('setLanguage', language)
          }
        })
      },
      async getRoomList ({
        commit,
        state
      }, payload: IRoomListParams) {
        let cities = state.cities
        if (!cities.length) {
          const { result } = await getCities()
          cities = result
          state.cityId = cities[0]?._id
          commit('setCities', cities)
        }
        const { pageNo, cityId = state.cityId } = payload
        const params = {
          pageNo,
          pageSize: state.pageSize,
          cityId: cityId
        }
        state.pageNo = pageNo
        return new Promise((resolve) => {
          fetchRoomList(params).then(res => {
            const {
              success,
              result
            } = res as any
            const orders = result.orders
            const total = result.total
            if (success) {
              commit('setRoomList', orders.data)
              state.total = total
              resolve(true)
            }
          })
        })
      },
      // 房屋详情接口
      getRoomDetail ({
        commit,
        state
      }, payload: IRoomDetailParams) {
        const { id } = payload
        return new Promise((resolve, reject) => {
          fetchDetail({ id }).then(res => {
            const { success, result } = res as any
            if (success) {
              commit('setRoomDetail', result)
              resolve(true)
            }
          })
        })
      }
    }
  })
}
