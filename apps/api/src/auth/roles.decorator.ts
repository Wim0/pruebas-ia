/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/auth/roles.decorator.ts
 * ----------------------------------------------------------------
 * Propósito: Un decorador personalizado para asignar metadatos de roles
 * a nuestras rutas. El AuthGuard usará estos metadatos.
 */

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
