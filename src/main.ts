import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClient } from 'redis';
import { Port, RedisUrl } from './enviornment_variables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Port);
  await checkForRedisConnection();
}
bootstrap();

const checkForRedisConnection = async () => {
  try {
    const client = await createClient({
      url: RedisUrl,
    }).connect();
    await client.disconnect();
  } catch (e) {
    console.log('Not able to connect to Redis!');
    process.exit(1);
  }
};
