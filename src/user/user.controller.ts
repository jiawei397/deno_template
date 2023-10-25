import {
  BadRequestException,
  Body,
  Controller,
  Form,
  Get,
  Post,
  Query,
  UseGuards,
} from "@nest";
import { type SSOUserInfo, UserParam } from "@nest/uinv";
import { UserService } from "./services/user.service.ts";
import { AddUserDto, SearchUserDto, UpdateUserDto } from "./dtos/user.dto.ts";
import { SSOGuard } from "../guards/sso.guard.ts";

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
  // deno-lint-ignore no-explicit-any
  upload(@Form() form: any) {
    console.log("---upload----", form);
    return "upload ok";
  }
}
