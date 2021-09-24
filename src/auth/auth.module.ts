import { Module } from '@nestjs/common';
import { ConfigModule /* ConfigService */ } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
// import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    ConfigModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '60s' },
    //   }),
    // }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    // JwtStrategy,
    AuthSerializer,
  ],
  exports: [AuthService],
})
export class AuthModule {}
