import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});

export async function connectDB() {
  await db.connect();
  console.log("DATABASE IS CONNECTED!");
}

export async function disconnectDB() {
  await db.close();
  console.log("DATABASE DISCONNECTED!");
}