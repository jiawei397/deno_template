import {
  BaseService as Base,
  Collection,
  getDB,
  SchemaCls,
} from "../../deps.ts";
import globals from "../globals.ts";

export const db = await getDB(globals.db);

export class BaseService<T> extends Base {
  declare model: Collection<T>;

  constructor(modelCls: SchemaCls, name?: string) {
    super(db, modelCls, name);
  }
}
