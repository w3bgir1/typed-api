import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  NotFoundError,
  Post,
  HttpCode
} from "routing-controllers";
import Page from "./entity";

@JsonController()
export default class PageController {
  @Get("/pages/:id")
  getPage(@Param("id") id: number) {
    return Page.findOne(id);
  }

  @Get("/pages")
  async allPages() {
    return await Page.find();
  }

  @Put("/pages/:id")
  async updatePage(@Param("id") id: number, @Body() update: Partial<Page>) {
    const page = await Page.findOne(id);
    if (!page) throw new NotFoundError("Cannot find page");

    return Page.merge(page, update).save();
  }

  @Post("/pages")
  @HttpCode(201)
  createPage(@Body() page: Page) {
    return page.save();
  }
}

// type PageList = { pages: Page[] };
//   @Get("/pages")
//   allPages(): PageList {
//     return { pages: Object.values(pagesById).map(value => value) };
//   }

//   @Put("/pages/:id")
//   updatePage(@Param("id") id: number, @Body() body: Partial<Page>): Page {
//     console.log(`Incoming PUT body param:`, body);
//     return pagesById[id];
//   }

//   @Post("/pages")
//   @HttpCode(201)
//   createPage(@Body() body: Page): Page {
//     console.log(`Incoming POST body param:`, body);
//     return body;
//   }
