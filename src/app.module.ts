import { Module, MiddlewareConsumer, NestModule, Inject } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
// import { UsersService } from './users/users.service';
// import { LoggerMiddleware } from './common/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
// import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { REDIS } from './redis/redis.constants';
import { RedisClient } from 'redis';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as passport from 'passport';
import { RedisModule } from './redis/redis.module';
import { LoggedInGuard } from './auth/logged-in.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'postgres',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    UsersModule,
    AuthModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LoggedInGuard,
    },
  ],
})
export class AppModule {
  constructor(
    private connection: Connection,
    @Inject(REDIS) private readonly redis: RedisClient,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: process.env.REDIS_SECRET,
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
