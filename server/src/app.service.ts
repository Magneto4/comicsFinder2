import { Injectable, OnModuleInit } from "@nestjs/common";
import getList from "./getList";

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log(`Initialization...`);
    getList("Creators/Writers");
    getList("Creators/Pencilers");
    getList("Creators/Inkers");
    getList("Creators/Colorists");
    getList("Creators/Letterers");
    getList("Creators/Editors");
    getList("Characters");
    console.log("Done getting lists");
  }
  getHello(): string {
    return "Hello World!";
  }
}
