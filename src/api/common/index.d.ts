// declare namespace API {
type PaginationParam = {
  current?: number
  pageSize?: number
} & Record<string, unknown>

type ResponseResult<T> = {
  success?: boolean
  data?: T
  total?: number
  error?: ErrorResult
}

type ErrorResult = {
  id?: string
  code?: number
  detail?: string
  status?: string
}
