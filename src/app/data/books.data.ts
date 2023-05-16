import { AuthorTable } from "./authors.data";

export interface Book {
  id: number;
  title: string;
  publishYear: number;
  pages: number;
  isbn: string;
  authorId: number;
  authorName?: string;
}

export class BookTable {
  private static _books: Book[] = [
    {
      id: 1,
      title: 'BBQ at Mike\'s',
      publishYear: 2021,
      pages: 450,
      isbn: 'sssss',
      authorId: 1
    },
    {
      id: 2,
      title: 'BBQ at Mike\'s',
      publishYear: 2021,
      pages: 450,
      isbn: 'sssss',
      authorId: 2
    },
    {
      id: 3,
      title: 'BBQ at Mike\'s',
      publishYear: 2021,
      pages: 450,
      isbn: 'sssss',
      authorId: 1
    },
    {
      id: 4,
      title: 'BBQ at Mike\'s',
      publishYear: 2021,
      pages: 450,
      isbn: 'sssss',
      authorId: 1
    },
    {
      id: 5,
      title: 'BBQ at Mike\'s',
      publishYear: 2021,
      pages: 450,
      isbn: 'sssss',
      authorId: 2
    },
  ];
  public static books: Book[] = BookTable._books.map(book =>  {
    const author = AuthorTable.authors.find(a => a.id === book.authorId);
    book.authorName = author.name;
    return book;
  });
}
