export type IInputCreateCompanyDTO = {
  name: string;
  cnpj: string;
};

export interface IOutputCreateCompanyDTO extends IInputCreateCompanyDTO {
  id: string;
  created_at: Date;
  updated_at: Date;
}
