import { Injectable } from "oak_nest";
import { InjectModel, Model } from "deno_mongo_schema";
import { logger } from "../../tools/log.ts";
import { AddUserDto } from "../dtos/user.dto.ts";
import { User } from "../schemas/user.schema.ts";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly model: Model<User>) {
  }
  async save(createUserDto: AddUserDto): Promise<string> {
    const id = await this.model.insertOne(createUserDto);
    logger.debug(`创建用户【${createUserDto.username}】成功！`);
    return id.toString();
  }

  findById(id: string): Promise<User | undefined> {
    return this.model.findById(id);
  }

  findByIds(ids: string[]): Promise<User[]> {
    return this.model.findMany({
      id: {
        $in: ids,
      },
    });
  }

  findByName(name: string) {
    return this.model.findMany({
      username: name,
    }, {
      projection: {
        username: 1,
        email: 1,
      },
    });
  }

  update(id: string, data: Partial<User>) {
    return this.model.findByIdAndUpdate(id, {
      $set: data,
    }, {
      new: true,
    });
  }

  deleteById(id: string) {
    return this.model.deleteById(id);
  }

  syncIndex() {
    return this.model.syncIndexes();
  }
}
