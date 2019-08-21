import { PATH_METADATA, METHOD_METADATA, ROUTE_METADATA, MIDDLEWARE_METADATA, QUERY_METADATA } from './constant';
import { RequestMethod } from './request-method';
import { RequestType } from './request-type';
import { Route } from '../../utils/route-type';
import { checkSearchParams } from '../../middleware/checks';

const defaultMetadata = {
  [PATH_METADATA]: '/',
  [METHOD_METADATA]: RequestMethod.GET,
};

interface RequestMappingMetadata {
  path?: string | string[];
  method?: RequestMethod;
  middlewares?: Function[];
}

export const RequestMapping = (
  metadata: RequestMappingMetadata = defaultMetadata,
): MethodDecorator => {
  const pathMetadata = metadata[PATH_METADATA];
  const path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
  const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET;

  return (target, key, descriptor: PropertyDescriptor) => {
    const routes = Reflect.getOwnMetadata(ROUTE_METADATA, target.constructor) || [];
    const middlewares = metadata['middlewares'] || [];
    const route: Route = {
      path,
      method: requestMethod,
      handler: [...middlewares, descriptor.value]
    }
    routes.push(route)

    Reflect.defineMetadata(ROUTE_METADATA, routes, target.constructor)
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    return descriptor;
  };
};

export const createMappingDecorator = (method: RequestMethod) => (
  request?: RequestType
): MethodDecorator => {
  var middlewares: Function[] = [];
  var path: string | string[] = ''
  if (request) {
    var mdls = request.middlewares || []
    path = request.path || ''
    if (typeof mdls === 'function') {
      middlewares = [mdls];
    } else {
      middlewares = mdls;
    }
    if (request.query) {
      Reflect.defineMetadata(QUERY_METADATA, request.query, checkSearchParams)
      middlewares.push(checkSearchParams)
    }
  }
  return RequestMapping({
    [PATH_METADATA]: path,
    [METHOD_METADATA]: method,
    middlewares: middlewares
  });
};