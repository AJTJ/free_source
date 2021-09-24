// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { ValidateUserArgs } from './dto/args/validate-user.args';
// import { AUTH_CONSTANTS } from './auth-constants';

// const cookieExtractor = function (req) {
//   let token = null;
//   if (req && req.cookies) {
//     token = req.cookies[AUTH_CONSTANTS.FREE_AUTH];
//   }
//   return token;
// };
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//       ignoreExpiration: false,
//       secretOrKey: configService.get('JWT_SECRET'),
//     });
//   }

//   async validate(payload: ValidateUserArgs) {
//     console.log('in jwt validate');
//     return { id: payload.id, name: payload.name };
//   }
// }
