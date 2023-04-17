import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {UserService} from "../service/user.service";
import {DataSource } from 'typeorm';
import {DatabaseService} from "../service/DatabaseService";
import {ILoginRequestDto} from "../interfaces/ILoginRequestDto";
import * as bcrypt from 'bcrypt';
import {QuizService} from "../service/quiz.service";
import {ICheckAnswerRequestDto, IQuestionResponseDto} from "../interfaces/quiz.interface";
import {ModuleCategory} from "../model/ModuleCategory";
import {QuestionCategory} from "../model/QuestionCategory";
import {IUserAnswerResponseDto} from "../interfaces/IUserAnswerResponseDto";
import {Auth} from "../decorator/AuthDecorator";

@Controller("quiz")
@Auth()
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get()
  async getQuestions(): Promise<IQuestionResponseDto[]> {
    return this.quizService.getQuestions();
  }

  @Get('/answered')
  async getAnsweredQuestions(@Query('questionCategory') questionCategory: QuestionCategory): Promise<IQuestionResponseDto[]> {
    return this.quizService.getAnsweredQuestions(questionCategory);
  }

  @Get('/customAnswer')
  async getCustomAnswer(@Query('questionId') questionId: number): Promise<IUserAnswerResponseDto> {
    return this.quizService.getCustomAnswer(questionId);
  }

  @Get('/category/:question_category')
  async getQuestionsByCategory(@Param('question_category') question_category: QuestionCategory): Promise<IQuestionResponseDto[]> {
    return this.quizService.getQuestions(question_category);
  }
  @Get('/module/:module_category')
  async getQuestionsByModule(@Param('module_category') module_category: ModuleCategory): Promise<IQuestionResponseDto[]> {
    return this.quizService.getQuestions(undefined, module_category);
  }
  @Post('/check')
  async checkQuestion(@Body() req: ICheckAnswerRequestDto) {
    return this.quizService.checkAnswer(req);
  }
}
