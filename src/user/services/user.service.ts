import { BaseService } from "../../tools/db.ts";
import { logger } from "../../tools/log.ts";
import { AddUserDto } from "../dtos/user.dto.ts";
import { User } from "../schemas/user.schema.ts";

class UserService extends BaseService<User> {
  async save(createUserDto: AddUserDto): Promise<string> {
    const id = await this.model.insertOne(createUserDto);
    logger.debug(`创建用户【${createUserDto.username}】成功！`);
    console.log(id);
    return id;
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

  update(id: string, data: Partial<User>): Promise<User> {
    return this.model.findByIdAndUpdate(id, {
      $set: data,
    }, {
      new: true,
    }) as Promise<User>;
  }

  deleteById(id: string) {
    return this.model.deleteById(id);
  }
}

export const userService = new UserService(User);
