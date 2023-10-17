import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './modules/user/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    WinstonModule.forRoot(winstonConfig),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
