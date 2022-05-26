import { createConnection } from 'typeorm';

export default async function connection(): Promise<void> {
  await createConnection();
}
