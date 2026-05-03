export interface IHttpClient {
  get(url: string): Promise<{ statusCode: number }>;
}
