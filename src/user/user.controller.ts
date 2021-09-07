import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
} from "../../deps.ts";
import { userService } from "./services/user.service.ts";
import { SimpleGuard } from "../guard/simple.guard.ts";
import { BadRequestException } from "https://deno.land/x/oak_nest@v0.0.7/mod.ts";
import { User } from "./schemas/user.schema.ts";
import { UpdateUserDto } from "./dto/user.dto.ts";


@Controller("/user")
export class UserController {

  @UseGuards(SimpleGuard)
  @Post("add")
  add(@Body() params: User) {
    return userService.save(params);
  }

  @UseGuards(SimpleGuard)
  @Get("delete")
  deleteById(@Query("id") id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    console.log(id);
    return userService.deleteById(id);
  }

  @UseGuards(SimpleGuard)
  @Post("update")
  update(@Body(UpdateUserDto) params: UpdateUserDto) {
    return userService.update(params.id, {
      email: params.email,
      username: params.username
    });
  }


  @UseGuards(SimpleGuard)
  @Get("query")
  query(@Query("id") id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    console.log(id);
    return userService.findById(id);
  }
}
