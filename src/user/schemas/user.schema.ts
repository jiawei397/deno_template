import { Prop, Schema } from "../../../deps.ts";

export class User extends Schema {
  _id!: string;

  @Prop()
  id!: string;


  @Prop({
    required: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  username!: string;
}

export type UserKey = keyof User;
export type UserKeys = UserKey[];
