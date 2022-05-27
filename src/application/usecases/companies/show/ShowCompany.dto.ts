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

type IEmployeeDTO = {
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
  address: IAddressDTO;
};

export type IInputShowCompanyDTO = {
  cnpj: string;
};

export type IOutputShowCompanyDTO = {
  name: string;
  cnpj: string;
  employees: IEmployeeDTO[];
};
