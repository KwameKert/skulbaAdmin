import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../sidebar/sidebar-data';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgScrollbarModule, TablerIconsModule, MaterialModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  userFullName = '';
  userEmail = '';
  userInitial = '';

  constructor(
    private vsidenav: CoreService,
    public dialog: MatDialog,
    private keycloak: Keycloak,
  ) {}

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then((profile) => {
      this.userFullName = `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim();
      this.userEmail = profile.email ?? '';
      this.userInitial = (profile.firstName?.charAt(0) ?? profile.username?.charAt(0) ?? '?').toUpperCase();
    });
  }

  openDialog() {
    this.dialog.open(AppSearchDialogComponent);
  }

  logout(): void {
    this.keycloak.logout();
  }
}

@Component({
  selector: 'search-dialog',
  imports: [RouterModule, MaterialModule, TablerIconsModule, FormsModule],
  templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;
  navItemsData = navItems.filter((navitem) => navitem.displayName);
}
