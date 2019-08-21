import { PATH_METADATA } from "./utils/constant";

export default (
  name: string,
  path: string = "",
  version: number = 1
): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(PATH_METADATA, `api/v${version}/${name}${path}`, target);
  }
}