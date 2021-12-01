import { Prop, Schema } from "../../../deps.ts";

export class User extends Schema {
  @Prop({
    required: true,
  })
  email!: string;

  @Prop({
    required: true,
    // index: true,
    // sparse: true,
    // unique: true,
  })
  username!: string;
}

export type UserKey = keyof User;
export type UserKeys = UserKey[];
