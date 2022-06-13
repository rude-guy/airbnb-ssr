import { IResultOr as IResult, IRoomDetailParams } from '@/api/interface'
import { http } from '@/utils/http'

// Mock接口
export async function fetchDetail (params: IRoomDetailParams): Promise<IResult> {
  return http.httpGet(`/room/findDetail/${params.id}`)
}
