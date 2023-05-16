import { Author } from "../../data/authors.data";

export class AuthorModel implements Author {
  id: number;
  name: string;
  birthYear: number;
  nationality: string;
  deleted: boolean;
}