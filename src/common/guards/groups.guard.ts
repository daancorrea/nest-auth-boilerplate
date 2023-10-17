import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GroupsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const groups = this.reflector.getAllAndOverride<number[]>('groups', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!groups.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (request.user?.roles) {
      for (const role of request.user.roles) {
        if (groups.includes(role.group_id)) {
          return true;
        }
      }
    }
    return false;
  }
}
