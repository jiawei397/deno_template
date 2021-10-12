import {
  BadRequestException,
  Body,
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

@Controller("/user")
@UseGuards(SSOGuard)
export class UserController {
  @Get("userinfo")
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
}
