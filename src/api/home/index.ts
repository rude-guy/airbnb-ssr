import { IResultOr as IResult, IRoomListParams } from '@/api/interface'
import { http } from '@/utils/http'

// Mock接口
export async function fetchRoomList (params: IRoomListParams): Promise<IResult> {
  return http.httpGet('/room/roomList', params)
}
