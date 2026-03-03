import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from "../shared/public.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { AuthorizationDecoratorArgs, KEY_AUTHORIZATION } from "../shared/authorization/authorization.decorator";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService) {
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

    const isChangePasswordRoute = request.url.includes('password-change') || request.url.includes('auth/login');

    // Lógica de bloqueio: se deve mudar a senha e NÃO está na rota de mudança
    if (user?.mustChangePassword && !isChangePasswordRoute) {
      throw new UnauthorizedException('Você precisa alterar sua senha padrão.');
    }

    const requiredPermissions =
      this.reflector.getAllAndOverride<AuthorizationDecoratorArgs[]>(
        KEY_AUTHORIZATION,
        [context.getHandler(), context.getClass()],
      );

    // 2️ Se não exige permissão, só JWT já basta
    if (!requiredPermissions?.length) return true;

    const req = context.switchToHttp().getRequest();
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    // 3️ Validação de permissão
    const hasPermissions = await this.userService.hasPermissions(
      userId,
      requiredPermissions,
    );

    if (!hasPermissions) {
      throw new UnauthorizedException('Permissão insuficiente');
    }

    return true;
  }
}