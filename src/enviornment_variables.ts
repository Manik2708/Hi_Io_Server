import { configDotenv } from 'dotenv';

configDotenv();

export const RedisUrl: string | undefined =
  process.env.REDIS_URL == null || undefined
    ? undefined
    : process.env.REDIS_URL;
export const Port: string =
  process.env.PORT == null || undefined ? '0' : process.env.PORT;
