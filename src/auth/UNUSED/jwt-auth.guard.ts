// import { Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
// import { ExecutionContext } from '@nestjs/common';
// import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
// import { GqlExecutionContext } from '@nestjs/graphql';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   getRequest(context: ExecutionContext) {
//     console.log('in jwt-auth.gaurd getRequest');
//     const ctx = GqlExecutionContext.create(context);
//     return ctx.getContext().req;
//   }

//   canActivate(context: ExecutionContext) {
//     console.log('in jwt-auth.gaurd canActivate');
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) {
//       return true;
//     }
//     return super.canActivate(context);
//   }
// }
