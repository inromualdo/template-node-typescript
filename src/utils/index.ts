import 'reflect-metadata';
import { Router } from "express";
import { ROUTE_METADATA, PATH_METADATA } from '../decorators/utils/constant';

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

export const applyRoutes = (controllers: any, router: Router) => {
  for (const controller of controllers) {
    const routes = Reflect.getMetadata(ROUTE_METADATA, controller);
    const controllerPath = Reflect.getMetadata(PATH_METADATA, controller);
    for (const route of routes) {
      const { method, path, handler } = route;
      const pth = `/${controllerPath}${path}`;
      (router as any)[method](pth, handler);
    }
  }
};