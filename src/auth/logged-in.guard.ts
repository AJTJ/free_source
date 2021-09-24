import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const gqlCtx = GqlExecutionContext.create(context);
    return gqlCtx.getContext().req.isAuthenticated();
  }
}
