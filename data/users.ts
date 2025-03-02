export interface Users {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

export const Users: Users[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    createdAt: new Date(),
  },
];
