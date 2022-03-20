type HTTPBody = {
  [key: string]: any
}

export interface HTTPRequest {
  body: any
}

export interface HTTPResponse {
  statusCode: number
  body: any
}
