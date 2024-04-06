import { Injectable, OnModuleInit } from '@nestjs/common';
import getList from './getList';

@Injectable()
export class AppService implements OnModuleInit {
	onModuleInit() {
		console.log(`Initialization...`);
		getList("Marvel_Staff/Writers");
		getList("Marvel_Staff/Pencilers");
		getList("Marvel_Staff/Inkers");
		getList("Marvel_Staff/Colorists");
		getList("Marvel_Staff/Letterers");
		getList("Marvel_Staff/Editors");
		getList("Characters");
		console.log("Done getting lists")
	}
  getHello(): string {
    return 'Hello World!';
  }
}
