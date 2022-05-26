// Repositórios tem ligação um-pra-um com agregados
// T = Agregado
export default interface IRepositoryInterface<T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  find(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}
