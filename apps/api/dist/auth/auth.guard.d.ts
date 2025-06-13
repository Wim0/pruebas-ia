import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@clerk/clerk-sdk-node';
import 'express';
declare module 'express' {
    interface Request {
        user?: User;
    }
}
export declare class ClerkAuthGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
