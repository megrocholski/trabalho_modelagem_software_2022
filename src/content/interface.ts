import { Path } from "react-router-dom";

export interface ICardAdmin {
  title: String;
  link: any;
  subtitle: String;
  img: string;
  label: string;
}

interface ISubject {
  classId: number;
  name: string;
  id: number;
  total_hours: number;
  disabled: boolean;
}

interface ISchedule {
  classroom: string;
  daytime: number;
  id: number;
  subject?: ISubject;
  length: number;
}

interface IYears {
  id: number;
  period: number;
  schedules: ISchedule[];
}

export interface ICourse {
  id: number;
  name: string;
  total_period: number;
  years: IYears[];
}

export interface ICourses {
  title?: string;
  courses: Array<ICourse>;
}

export interface IInput {
  title: string;
  types?: string;
}

interface IUser {
  cpf: string;
  disable: boolean;
  email: string;
  id: number;
  rg: string;
  type: number;
  name: string;
}

export interface ITeacher {
  id: number;
  user: IUser;
  rf: string;
}

export interface IInput {
  title: string;
}

export interface IModal {
  title: string;
  inputs: IInput[];
}
