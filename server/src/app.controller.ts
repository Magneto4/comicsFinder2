import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import getList from "./getList";
import { getComics } from "./getComics";

class Request {
  characters: string[];
  colorists: string[];
  editors: string[];
  inkers: string[];
  letterers: string[];
  pencilers: string[];
  writers: string[];
}

@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "this is a test string";
  }

  @Get("/appearances/")
  async getAppearances(
    @Query("characters") characters: string,
    @Query("writers") writers: string,
    @Query("pencilers") pencilers: string,
    @Query("inkers") inkers: string,
    @Query("colorists") colorists: string,
    @Query("letterers") letterers: string,
    @Query("editors") editors: string
  ) {
    let results = await getComics(
      characters?.split(",") || [],
      writers?.split(",") || [],
      pencilers?.split(",") || [],
      inkers?.split(",") || [],
      colorists?.split(",") || [],
      letterers?.split(",") || [],
      editors?.split(",") || []
    );
    return results;
  }

  @Get("/list/:category")
  async getListByCategory(@Param("category") category: string) {
    return await getList(category);
  }

  @Get("/list/Marvel_Staff/:category")
  async createMessage3(@Param("category") category: string) {
    return await getList("Marvel_Staff/" + category);
  }
}
