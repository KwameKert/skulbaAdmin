import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Keycloak from 'keycloak-js';

export const roleGuard: CanActivateFn = (_route, _state) => {
  const keycloak = inject(Keycloak);
  const router = inject(Router);

  const token = keycloak.tokenParsed;
  const realmRoles: string[] = token?.['realm_access']?.['roles'] ?? [];
  const clientRoles: string[] = Object.values(
    (token?.['resource_access'] as Record<string, { roles: string[] }>) ?? {}
  ).flatMap((r) => r.roles ?? []);

  const hasRole = [...realmRoles, ...clientRoles].includes('system-admin');
  return hasRole ? true : router.parseUrl('/access-denied');
};
