import { Component } from '@angular/core';
import Keycloak from 'keycloak-js';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './access-denied.component.html',
})
export class AccessDeniedComponent {
  constructor(private keycloak: Keycloak) {}

  logout(): void {
    this.keycloak.logout();
  }
}
