import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

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
}
