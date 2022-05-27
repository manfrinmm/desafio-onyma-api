type IInputAddressDTO = {
  id: number;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
};

type IUpdateEmployeeDTO = {
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  department: string;
  role: string;
  address: IInputAddressDTO;
  company_id: string;
};

interface IUpdateEmployeeWithEmailDTO extends IUpdateEmployeeDTO {
  email: string;
  phone?: string;
}
interface IUpdateEmployeeWithPhoneDTO extends IUpdateEmployeeDTO {
  phone: string;
  email?: string;
}

export type IInputUpdateEmployeeDTO =
  | IUpdateEmployeeWithEmailDTO
  | IUpdateEmployeeWithPhoneDTO;

export interface IOutputUpdateEmployeeDTO extends IUpdateEmployeeDTO {
  id: string;
  created_at: Date;
  updated_at: Date;
}
