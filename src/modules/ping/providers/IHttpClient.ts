export interface IHttpResponse {
  data: any
  status: number
  statusText: string
  headers: any
  responseTime: number
}

export interface IHttpClient {
  get(url: string, config?: any): Promise<IHttpResponse>
}
