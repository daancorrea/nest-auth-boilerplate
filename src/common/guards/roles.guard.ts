import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getGroupRoles } from '../../utils/get-group-roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!roles?.length) return true;

    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    if (request.user?.roles) {
      for (const role of getGroupRoles(request.user)) {
        if (roles.includes(role)) {
          return true;
        }
      }
    }

    return false;
  }
}
