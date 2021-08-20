import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
// import { UsersService } from './users/users.service';
// import { LoggerMiddleware } from './common/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'freesourcepw',
      database: 'postgres',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
