export interface Semester {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  deleted: boolean;
}

export class SemesterTable {
  public static semesters: Semester[] = [
    {
      id: 1,
      name: '2020/21/1',
      start_date: new Date(2020, 9, 15),
      end_date: new Date(2021, 1, 31),
      deleted: false,
    },
    {
      id: 2,
      name: '2020/21/2',
      start_date: new Date(2021, 2, 15),
      end_date: new Date(2021, 6, 31),
      deleted: false,
    },
    {
      id: 3,
      name: '2021/22/1',
      start_date: new Date(2021, 9, 15),
      end_date: new Date(2022, 1, 31),
      deleted: false,
    },
  ];
}
