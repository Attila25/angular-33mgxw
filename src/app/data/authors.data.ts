export interface Author {
  id: number;
  name: string;
  birthYear: number;
  nationality: string;
  deleted: boolean;
}

export class AuthorTable {
  public static authors: Author[] = [
    {
      id: 1,
      name: 'Jane Doe',
      birthYear: 1979,
      nationality: 'american',
      deleted: false
    },
    {
      id: 2,
      name: 'John Doe',
      birthYear: 1988,
      nationality: 'hungarian',
      deleted: false
    },
    {
      id: 3,
      name: 'Hans Regenkurt',
      birthYear: 1954,
      nationality: 'german',
      deleted: false
    }
  ];
}
