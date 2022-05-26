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

export type IOutputListEmployeeDTO = {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  department: string;
  role: string;
  address: IInputAddressDTO;
  email?: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
}[];
