import 'reflect-metadata';
import { PROPERTY_METADATA } from './constants';
import { PropertyMeta } from './property-meta';


export default (updates?: PropertyMeta) => {
  return (target: any, propertyKey: string) => {
    const ups = updates || {};
    if (!ups.name) {
      ups.name = propertyKey || ''
    }
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    const properties = Reflect.getMetadata(PROPERTY_METADATA, target) || {};

    if (!ups.type) {
      ups.type = type.name.toLowerCase();
    }

    if (typeof ups.required === 'undefined') {
      ups.required = true
    }

    properties[propertyKey] = ups
    Reflect.defineMetadata(PROPERTY_METADATA, properties, target);
  }
}