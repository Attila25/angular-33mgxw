export class User {
  id?: number;
  neptun?: string;
  name?: string;
  email?: string;
  department?: string;
  birthyear?: Date;
  role?: string[];
  token?: string;
}

export class UserTable {
  public static users: User[] = [
    {
      id: 1,
      neptun: 'GGG777',
      name: 'Varga László',
      email: 'val@gmail.com',
      department: '',
      birthyear: new Date(1998, 2, 25),
      role: ['Student'],
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODQ1ODA3ODMsImV4cCI6MTcxNjExNjc4MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5hbWUiOiJWYXJnYSBMw6FzemzDsyIsImVtYWlsIjoidmFsQGdtYWlsLmNvbSIsInJvbGUiOiJTdHVkZW50IiwiYmlydGh5ZWFyIjoiMTk5OC4yLjI1IiwibmVwdHVuIjoiR0dHNzc3In0.UumQvoIoJimPU0wiogN_iVz28tC5M-x3vRDuFcgqv4Q',
    },
    {
      id: 2,
      neptun: 'BBB222',
      name: 'Kiss József',
      email: 'prof@gmail.com',
      department: 'VIRT',
      birthyear: new Date(1978, 11, 12),
      role: ['Teacher'],
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODQ1ODA3ODMsImV4cCI6MTcxNjExNjc4MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5hbWUiOiJLaXNzIErDs3pzZWYiLCJlbWFpbCI6InByb2ZAZ21haWwuY29tIiwicm9sZSI6IlRlYWNoZXIiLCJiaXJ0aHllYXIiOiIxOTc4LjExLjEyIiwibmVwdHVuIjoiQkJCMjIyIn0.sPc5iJg192pplwWRNSobHfpzsTS3bckXyHL1aOnYQqs',
    },
    {
      id: 3,
      neptun: 'CCC333',
      name: 'Admin Károly',
      email: 'exp@gmail.com',
      department: '',
      birthyear: new Date(1968, 9, 4),
      role: ['Admin'],
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODQ1ODA3ODMsImV4cCI6MTcxNjExNjc4MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5hbWUiOiJBZG1pbiBLw6Fyb2x5IiwiZW1haWwiOiJleHBAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiYmlydGh5ZWFyIjoiMTk2OC45LjQiLCJuZXB0dW4iOiJDQ0MzMzMifQ.n5sCZvEg3Y-wVBY2vMCPvmN-Y_3Ioy_c_y_rEJlXy4E',
    },
  ];
}
