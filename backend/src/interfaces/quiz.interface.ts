import {QuestionType} from "../model/QuestionType";

export interface IQuestionResponseDto {
    id: number;
    question: string;
    explanation: string;
    instruction: string;
    info: string;
    answers: IAnswersResponse[];
    type: QuestionType;
    instruction_image: string;
    drag_drop_false: string;
    drag_drop_true: string;
    question_image: string;
    question_category: string;
    module_category: string;
}

export interface IAnswersResponse {
    id: number;
    answer: string;
    image: string;
}

export interface ICheckAnswerRequestDto {
    questionId: number;
    answerId: number;
    dragDropAnswer: boolean;
    customAnswer: string;
}

export interface ICheckAnswerResponseDto {
    answers?: number[];
    result?: boolean;
}