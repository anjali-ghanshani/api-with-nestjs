import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): {} {
    return this.appService.getHello();
  }

  @Post('execute')
  execCode(@Body() postData: { script: string; language: string }): {} {
    const { script, language } = postData;
    // console.log(script);
    console.log('inside execCode');
    return this.appService.execRun(script);
  }
}
