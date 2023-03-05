import { Module } from '@nestjs/common';
import { UserController } from './controller/userController';
import {ConfigModule} from "@nestjs/config";
import {DatabaseService} from "./service/DatabaseService";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./service/user.service";
import {User} from "./model/User";
import {QuizQuestion} from "./model/QuizQuestion";
import {QuizAnswer} from "./model/QuizAnswer";
import {QuizService} from "./service/quiz.service";
import {QuizController} from "./controller/quizController";
import {UserAnswer} from "./model/UserAnswer";
import {JwtService} from "./service/jwt.service";
import {ContextService} from "./service/context.service";



@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['./environments/.env.local', './environments/.env.prod'],
    cache: true,
    isGlobal: true,
  }), TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
    TypeOrmModule.forFeature([User, QuizQuestion, QuizAnswer, UserAnswer])],
  controllers: [UserController, QuizController],
  providers: [DatabaseService, UserService, QuizService, JwtService, ContextService],
})
export class AppModule {}
