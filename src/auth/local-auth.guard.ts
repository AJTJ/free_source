import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
/**
 * When you declare your local strategy you extend the result of the PassportStragety(Strategy) method which ends up extending the Strategy from the passport-local package (which is the Strategy you passed into the PassportStrategy method).  When NestJS instantiates your local.strategy the constructor bubbles up to the passport-local constructor which has local as the hardcoded name, which it registers with passport via the call() method.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const { username, password } =
      gqlCtx.getContext().req.body.variables.passwordLoginInput;
    const req = gqlCtx.getContext().req;
    req.body.username = username;
    req.body.password = password;
    return req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const result = (await super.canActivate(context)) as boolean;
    await super.logIn(gqlCtx.getContext().req);
    return result;
  }
}
