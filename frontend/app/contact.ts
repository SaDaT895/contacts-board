export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface ContactCard extends Contact {
  createdate: string;
  lastmodifieddate: string;
}
