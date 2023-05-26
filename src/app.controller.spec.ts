import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toEqual({
        output: 'Yes',
        statuscode: 0,
      });
    });
  });

  describe('/execute', () => {
    it("should return a JSON with output 'No'", () => {
      expect(
        appController.execCode({
          script: 'console.log("Hello")',
          language: 'Javascript',
        }),
      ).toEqual({
        output: 'No',
        statuscode: 0,
      });
    });
  });
});
