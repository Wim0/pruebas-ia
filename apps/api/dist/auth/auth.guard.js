'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClerkAuthGuard = void 0;
const common_1 = require('@nestjs/common');
const core_1 = require('@nestjs/core');
const clerk_sdk_node_1 = require('@clerk/clerk-sdk-node');
require('express');
let ClerkAuthGuard = class ClerkAuthGuard {
  reflector;
  constructor(reflector) {
    this.reflector = reflector;
  }
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const sessionToken = request.headers.authorization?.replace('Bearer ', '');
    if (!sessionToken) {
      throw new common_1.UnauthorizedException(
        'Authorization token is missing.',
      );
    }
    try {
      const payload = await clerk_sdk_node_1.clerkClient.sessions.verifySession(
        sessionToken,
        '',
      );
      if (!payload) {
        throw new common_1.UnauthorizedException('Invalid session.');
      }
      const user = await clerk_sdk_node_1.clerkClient.users.getUser(
        payload.userId,
      );
      request.user = user;
      const requiredRoles = this.reflector.get('roles', context.getHandler());
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }
      const userRoles = user.publicMetadata?.roles || [];
      const hasRequiredRole = requiredRoles.some((role) =>
        userRoles.includes(role),
      );
      if (!hasRequiredRole) {
        throw new common_1.ForbiddenException(
          'You do not have the required role(s).',
        );
      }
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('Clerk Auth Error:', errorMessage);
      throw new common_1.UnauthorizedException('Authentication failed.');
    }
  }
};
exports.ClerkAuthGuard = ClerkAuthGuard;
exports.ClerkAuthGuard = ClerkAuthGuard = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata('design:paramtypes', [core_1.Reflector]),
  ],
  ClerkAuthGuard,
);
//# sourceMappingURL=auth.guard.js.map
