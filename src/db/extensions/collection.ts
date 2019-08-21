import 'reflect-metadata';
import { Db, InsertOneWriteOpResult } from 'mongodb';
import { PROPERTY_METADATA } from './constants';
import { PropertyMeta } from './property-meta';

export abstract class Collection {
  _id: string | undefined = '';

  constructor(_id: string | undefined) {
    this._id = _id;
  }

  async insert<T extends Collection>(db: Db): Promise<T> {
    const vl = this.getValues(this);
    var result: InsertOneWriteOpResult = await db.collection(this.getCollectionName()).insertOne(vl);
    return result.ops[0];
  }

  async delete(db: Db) {
    if (!this._id || this._id.length === 0) {
      throw new Error("No _id found in object")
    }
    await db.collection(this.getCollectionName()).deleteOne({
      _id: this._id
    })
  }

  static async deleteOne(db: Db, selector: any = {}) {
    await db.collection(this.constructor.name.toLowerCase()).deleteOne(
      selector)
  }

  static async deleteMany(db: Db, selector: any = {}) {
    await db.collection(this.constructor.name.toLowerCase()).deleteMany(
      selector)
  }

  private getCollectionName(): string {
    var _name = this.constructor.name.toLowerCase();
    return _name;
  }

  private getValues(context: any): any {
    var target: any = context;
    var properties = Reflect.getMetadata(PROPERTY_METADATA, context);
    var value: any = {}
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        this.checkProperty(properties[key], target[key])
        value[key] = target[key];
      }
    }
    return value;
  }

  checkProperty(metadata: PropertyMeta, value: any) {
    if (metadata.type && metadata.required) {
      this.checkPropertyType(metadata.name || '', metadata.type, value);
    }

    if (metadata.type === 'string' && metadata.required && !metadata.empty) {
      this.checkPropertyEmpty(metadata.name || '', metadata.type, value)
    }
  }

  private checkPropertyType(propertyName: string, type: string, value: any) {
    if (typeof value !== type) {
      throw new Error(`${propertyName} is not of type: ${type}. Find value: ${value}`);
    }
  }

  private checkPropertyEmpty(propertyName: string, type: string, value: any) {
    if (!value || typeof value !== 'string' || value.length <= 0) {
      throw new Error(`${propertyName} must not be empty`);
    }
  }
}