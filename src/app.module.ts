import { Module } from '@nestjs/common';
import { WebSocketsGateWay } from './websockets.gateway';
import { InjectionTokens } from './injection_tokens';
import { RedisUrl } from './enviornment_variables';

@Module({
  providers: [
    WebSocketsGateWay,
    {
      provide: InjectionTokens.RedisUrl,
      useValue: RedisUrl
    }
  ],
})
export class AppModule {}
