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
    const req = gqlCtx.getContext().req;

    console.log(
      'in get request of local-auth',
      gqlCtx.getContext().req.body.variables,
    );

    const { email, password } = req.body.variables.passwordLoginInput;
    req.body.email = email;
    req.body.password = password;

    console.log('req body local-auth', req.body);

    return req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('in local-auth can activate');
    const gqlCtx = GqlExecutionContext.create(context);
    const result = (await super.canActivate(context)) as boolean;
    await super.logIn(gqlCtx.getContext().req);
    return result;
  }
}
