import { Book } from "../components/book/book.model";

export interface CustomHttpResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    message: string;
    reason: string;
    developerMessage: string;
    books: Book[]
  }
  