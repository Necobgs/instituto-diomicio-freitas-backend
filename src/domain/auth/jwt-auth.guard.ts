import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from "../shared/public.decorator";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const canActivate = await super.canActivate(context);
    if (!canActivate) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user)
    
    const isChangePasswordRoute = request.url.includes('password-change');

    // Lógica de bloqueio: se deve mudar a senha e NÃO está na rota de mudança
    if (user?.mustChangePassword && !isChangePasswordRoute) {
      throw new UnauthorizedException('Você precisa alterar sua senha padrão.');
    }

    return true;
  }
}