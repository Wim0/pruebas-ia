/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/auth/auth.guard.ts
 * ----------------------------------------------------------------
 * Propósito: Un "guardián" de rutas que intercepta cada petición.
 * Valida el token de Clerk y verifica los roles del usuario.
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { clerkClient, User } from '@clerk/clerk-sdk-node';
import { Request } from 'express';
import 'express';

declare module 'express' {
  interface Request {
    user?: User;
  }
}

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const sessionToken = request.headers.authorization?.replace(
      'Bearer ',
      '',
    ) as string;

    if (!sessionToken) {
      throw new UnauthorizedException('Authorization token is missing.');
    }

    try {
      const payload = await clerkClient.sessions.verifySession(
        sessionToken,
        '',
      );
      if (!payload) {
        throw new UnauthorizedException('Invalid session.');
      }

      const user = await clerkClient.users.getUser(payload.userId);
      request.user = user;

      const requiredRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      const userRoles = (user.publicMetadata?.roles as string[]) || [];
      const hasRequiredRole = requiredRoles.some((role) =>
        userRoles.includes(role),
      );

      if (!hasRequiredRole) {
        throw new ForbiddenException('You do not have the required role(s).');
      }

      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('Clerk Auth Error:', errorMessage);
      throw new UnauthorizedException('Authentication failed.');
    }
  }
}
