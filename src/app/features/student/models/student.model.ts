export enum ECourseStudent {
  ENGINEERING,
  MEDICINE,
  ADMINISTRATION,
  LITERATURE,
  PSYCHOLOGY,
  NURSING,
  ARTS,
  ACCOUNTING,
}

export interface IStudentResponse {
  id: number;
  name: string;
  lastname: string;
  identification: string;
  email: string;
  course: ECourseStudent;
}

export interface ICreateStudent {
  name: string;
  lastname: string;
  identification: string;
  email: string;
  course: ECourseStudent;
}
