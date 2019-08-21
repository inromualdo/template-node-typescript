import { Collection } from "../extensions/collection";
import { Prop } from "../extensions";

enum TYPE {
  STUDENT,
  PROFESSOR
}

enum GENDER {
  M = "male",
  F = "female"
}

export interface ROLE {
  name: string,
  date: Date
}

export class User extends Collection {

  @Prop({
    empty: false
  })
  name: string = '';

  @Prop({})
  age: number = 0;

  @Prop()
  gender: GENDER = GENDER.F

  @Prop()
  type: TYPE = TYPE.PROFESSOR;

  @Prop()
  role: ROLE | undefined;

  constructor(_id: string = '') {
    super(_id);
  }

  static fromBasic(name: string, age: number): User {
    var user = new User();
    user.name = name;
    user.age = age;
    return user;
  }
}