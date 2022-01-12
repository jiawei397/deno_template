import { Body, Controller, Get, Post, Query, UseGuards } from "oak_nest";
import type { Context } from "oak_nest";
import { UserService } from "./services/user.service.ts";
import { AddUserDto, SearchUserDto, UpdateUserDto } from "./dtos/user.dto.ts";
import { UserParam } from "./user.decorator.ts";
import { SSOGuard } from "../guards/sso.guard.ts";
import { SSOUserInfo } from "utils";
import { BadRequestException } from "oak_exception";

@Controller("/user")
@UseGuards(SSOGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("info")
  userinfo(@UserParam() user: SSOUserInfo) {
    return user;
  }

  @Post("add")
  add(@Body() params: AddUserDto) {
    return this.userService.save(params);
  }

  @Get("delete")
  deleteById(@Query("id") id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    console.log(id);
    return this.userService.deleteById(id);
  }

  @Post("update")
  update(@Body() params: UpdateUserDto) {
    return this.userService.update(params.id, {
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
    return this.userService.findById(id);
  }

  @Get("syncIndex")
  syncIndex() {
    return this.userService.syncIndex();
  }

  @Post("search")
  search(@Body() params: SearchUserDto) {
    return this.userService.findByName(params.username);
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
