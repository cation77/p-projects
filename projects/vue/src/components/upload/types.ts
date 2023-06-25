export type IResult = {
  percentage: number
  hash: string
  fileChunks: Blob[]
}

export type IWorkerData = {
  file: File
  chunkSize: number
}

export interface IMorkerMessageEvent extends MessageEvent {
  data: IWorkerData
}

export interface IUploadMessageEvent extends MessageEvent {
  data: Partial<IResult>
}

export type ResponseResult = { code: number; msg: string; result: any }
