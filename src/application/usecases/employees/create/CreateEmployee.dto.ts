type IInputAddressDTO = {
  country: string;
  state: string;
  city: string;
  zipcode: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
};

type ICreateEmployeeDTO = {
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  department: string;
  role: string;
  address: IInputAddressDTO;
};

interface ICreateEmployeeWithEmailDTO extends ICreateEmployeeDTO {
  email: string;
  phone?: string;
}
interface ICreateEmployeeWithPhoneDTO extends ICreateEmployeeDTO {
  phone: string;
  email?: string;
}

export type IInputCreateEmployeeDTO =
  | ICreateEmployeeWithEmailDTO
  | ICreateEmployeeWithPhoneDTO;

export interface IOutputCreateEmployeeDTO extends ICreateEmployeeDTO {
  id: string;
  created_at: Date;
  updated_at: Date;
}
