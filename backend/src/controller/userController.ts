import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "../service/user.service";
import {DataSource } from 'typeorm';
import {DatabaseService} from "../service/DatabaseService";
import {ILoginRequestDto} from "../interfaces/ILoginRequestDto";
import * as bcrypt from 'bcrypt';
import {IAnswerQuestionRequestDto} from "../interfaces/IAnswerQuestionRequestDto";
import {AuthGuard} from "../guard/AuthGuard";
import {Auth} from "../decorator/AuthDecorator";
const crypto = require('crypto');

@Controller("user")
export class UserController {
  constructor(private userService: UserService,
              private databaseService: DatabaseService) {}

  @Get()
  async generateRandomUsers(): Promise<any[]> {
    let users = [];
    const AppDatasource = new DataSource({
        ...<any>this.databaseService.getDbOptions(),
    });
    const appDataSource = await AppDatasource.initialize();
    const queryRunner = await appDataSource.createQueryRunner();
    for (let i = 0; i < 100; i++) {
          const query = await queryRunner.manager.query("SELECT nextval('username_seq')");
          console.log(query);
          const password = Math.random().toString(36).slice(2, 7);
          let hash = crypto.createHash('md5').update(password).digest("hex");
          const user = {
            username: (Math.random() < 0.5 ? "AD" : "AN") + query[0].nextval,
            password,
            hash: hash,
          };
          users.push(user);
        await this.userService.createUser({
            username: user.username,
            password: user.hash,
        });
    }
    return users;
  }

    @Post('/login')
    async login(@Body() req: ILoginRequestDto) {
        return this.userService.login(req);
    }

    @Post('/answer')
    @Auth()
    async answerQuestion(@Body() req: IAnswerQuestionRequestDto) {
        return this.userService.answerQuestion(req);
    }

    @Get('/score')
    @Auth()
    async getScore() {
        return this.userService.getScore();
    }

    @Post('/logout')
    @Auth()
    async logout() {
      return this.userService.logout();
    }
}
