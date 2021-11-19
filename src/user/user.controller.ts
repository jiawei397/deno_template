import {
  BadRequestException,
  Body,
  Context,
  Controller,
  Get,
  Post,
  Query,
  SSOUserInfo,
  UseGuards,
} from "../../deps.ts";
import { userService } from "./services/user.service.ts";
import { SSOGuard } from "../guards/sso.guard.ts";
import { AddUserDto, UpdateUserDto } from "./dtos/user.dto.ts";
import { UserParam } from "./user.decorator.ts";
import { LogTime } from "../tools/log.ts";

@Controller("/user")
@UseGuards(SSOGuard)
export class UserController {
  @Get("info")
  @LogTime(UserController.name)
  userinfo(@UserParam() user: SSOUserInfo) {
    return user;
  }

  @Post("add")
  add(@Body(AddUserDto) params: AddUserDto) {
    return userService.save(params);
  }

  @Get("delete")
  deleteById(@Query("id") id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    console.log(id);
    return userService.deleteById(id);
  }

  @Post("update")
  update(@Body(UpdateUserDto) params: UpdateUserDto) {
    return userService.update(params.id, {
      email: params.email,
      username: params.username,
    });
  }

  @Get("query")
  query(@Query("id") id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    console.log("id = ", id);
    return userService.findById(id);
  }

  @Post("upload")
  async upload(ctx: Context) {
    const data = ctx.request.body({
      type: "form-data",
    });
    const result = await data.value.read();
    console.log("---upload----", result);
    ctx.response.body = "upload ok";
  }
}
