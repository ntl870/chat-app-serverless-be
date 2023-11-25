export interface BaseService<T> {
  findAll?(): Promise<T[]>;
  findById?(id: string): Promise<T | null>;
  create?(createDto: any): Promise<T>;
  update?(id: string, updateDto: any): Promise<T | null>;
  delete?(id: string): Promise<T | null>;
}
