import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

export const isRoutePublic = (
  context: ExecutionContext,
  reflector: Reflector,
): boolean => {
  return reflector.get(IS_PUBLIC_KEY, context.getHandler());
};
