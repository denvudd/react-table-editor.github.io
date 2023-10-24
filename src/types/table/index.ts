export interface TableDataResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TableData[];
}

export interface TableData {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

export enum TableDataKeys {
  Id = "id",
  Name = "name",
  Email = "email",
  BirthdayDate = "birthday_date",
  PhoneNumber = "phone_number",
  Address = "address",
}
