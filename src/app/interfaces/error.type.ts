export interface TErrorSources {
  path: string,
  message: string
}


export interface TGenericErrorResponse {
  StatusCode : number,
  message : string,
  errorSouces ?: TErrorSources[] 
}
