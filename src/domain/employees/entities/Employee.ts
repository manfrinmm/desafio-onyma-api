import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Address from '@domain/addresses/entities/Address';

@Entity('employees')
export default class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  birth_date: string;

  @Column()
  email?: string;

  @Column()
  phone?: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column()
  address_id: number;

  @Column()
  department: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
