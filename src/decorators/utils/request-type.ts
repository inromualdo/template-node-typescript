export interface RequestType {
  path?: string | string[];
  middlewares?: Function | Function[];
  query?: object
}