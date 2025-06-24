export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface ContactRecord extends Contact {
  createdate: string;
  lastmodifieddate: string;
}
