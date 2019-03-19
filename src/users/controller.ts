import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  NotFoundError,
  Post
} from "routing-controllers";
import User from "./entity";

@JsonController()
export default class UserConroller {
  @Get("/users/:id")
  getUser(@Param("id") id: number) {
    return User.findOne(id);
  }

  @Get("/users")
  async allUsers() {
    return await User.find();
  }

  @Put("/users/:id")
  async updateUser(@Param("id") id: number, @Body() update: Partial<User>) {
    const user = await User.findOne(id);
    if (!user) throw new NotFoundError("Cannot find user");

    return User.merge(user, update).save();
  }

  @Post("/users")
  async createUser(@Body() user: User) {
    const { password, ...rest } = user;
    const entity = User.create(rest);
    await entity.setPassword(password);
    return entity.save();
  }
}
