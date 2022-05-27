type ICompanyDTO = {
  name: string;
  cnpj: string;
};

type IAddressDTO = {
  country: string;
  state: string;
  city: string;
  zipcode: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
};

export type IInputShowEmployeeDTO = {
  cpf: string;
};

export type IOutputShowEmployeeDTO = {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  department: string;
  role: string;
  company_id: string;
  email?: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
  company: ICompanyDTO;
  address: IAddressDTO;
};
