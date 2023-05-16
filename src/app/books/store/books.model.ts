import { Book } from "../../data/books.data";

export class BookModel implements Book {
  id: number;
  title: string;
  publishYear: number;
  pages: number;
  isbn: string;
  authorId: number;
  authorName: string;
  deleted: boolean;
}