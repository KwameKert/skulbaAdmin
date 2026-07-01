# Skulba Admin — Project Context

Angular 21 admin portal for a multi-tenant school management platform (SkulbaAdmin). Connects to three backend microservices via Keycloak-authenticated HTTP.

---

## Tech Stack

- **Framework**: Angular 21, NgModule-based (NOT standalone app bootstrap)
- **UI**: Angular Material 21 + custom `MaterialModule` barrel (`src/app/material.module.ts`)
- **Icons**: `angular-tabler-icons` — picked per NgModule via `TablerIconsModule.pick(TablerIcons)`; standalone components import `TablerIconsModule` directly (no `.pick()` — that returns `ModuleWithProviders` which breaks standalone imports)
- **Auth**: Keycloak via `keycloak-angular` — guards at `FullComponent` route level
- **HTTP**: `provideHttpClient(withInterceptorsFromDi())` added to each feature module's providers
- **Forms**: Template-driven only (`FormsModule`, `ngForm`, `ngModel`) — ReactiveFormsModule is NOT used
- **Charts**: `ng-apexcharts` (only in legacy demo components — no live chart data yet)

---

## Microservice Endpoints

| Service | Base path | Used by |
|---|---|---|
| users | `/users/api/v1` | tenants, students, staffs, guardians, dashboard |
| academics | `/academics/api/v1` | dashboard stats |
| billings | `/billings/api/v1` | subscription, payroll-config, dashboard stats |

`apiBaseUrl` is set in `src/environments/environment.ts` (dev: `http://localhost:8080`) and `src/environments/environment.production.ts` (update placeholders before building for prod).

---

## Module Inventory

### Feature modules (`src/app/pages/`)

| Module | Path prefix | Type | Notes |
|---|---|---|---|
| `DashboardsModule` | `/dashboards` | Standalone components | `dashboard1` fetches live stats via `DashboardService`; `dashboard2` is still demo-only |
| `TenantsModule` | `/tenants` | NgModule, CRUD list | `TenantListComponent` + `TenantDialogComponent`; `TenantViewComponent` for detail |
| `SubscriptionModule` | `/subscription` | NgModule, CRUD list | Subscription plans + modules management |
| `StudentsModule` | `/students` | NgModule, cross-tenant search | Debounced search + server-side pagination |
| `StaffsModule` | `/staffs` | NgModule, cross-tenant search | Same pattern as students |
| `GuardiansModule` | `/guardians` | NgModule, cross-tenant search | Same pattern as students |
| `PayrollModule` | `/payroll` | NgModule, CRUD list | **Built this session** — statutory deductions + PAYE bands config |
| `AccessDeniedModule` | `/access-denied` | Standalone | Simple access denied page |

### Shared

- `src/app/pages/shared/models/common.model.ts` — `ApiResponse<T>`, `Page<T>`, `IPage`
- `src/app/material.module.ts` — barrel re-exports all Angular Material modules

---

## Key Patterns

### NgModule feature (CRUD list — tenants, subscription, payroll)
```
feature/
  feature.module.ts        NgModule with declarations + RouterModule.forChild + provideHttpClient
  feature.routing.ts       Routes array (not a module), consumed by forChild
  feature.model.ts         TypeScript interfaces
  feature.service.ts       @Injectable({ providedIn: 'root' })
  feature-list/
    feature-list.component.ts   standalone: false; MatPaginator; loads on ngOnInit
    feature-list.component.html mat-table + mat-paginator + "Add" button
    feature-dialog/
      feature-dialog.component.ts   clone data, extract action, close with { event, data }
      feature-dialog.component.html template-driven form, [disabled]="!form.valid"
```

### Pagination: server-side (service returns `Page<T>`)
```typescript
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
records: T[] = [];
totalElements = 0;

loadRecords(page = 0, size = 10) {
  service.getAll(page, size).subscribe(res => {
    this.records = res.data.content;
    this.totalElements = res.data.page.totalElements;
  });
}
onPageChange(event: PageEvent) { this.loadRecords(event.pageIndex, event.pageSize); }
```
Template: `[dataSource]="records"` on `mat-table`, `[length]="totalElements"` on `mat-paginator`, `(page)="onPageChange($event)"`.

Row index formula: `(paginator.pageIndex * paginator.pageSize) + i + 1`.

### Cross-tenant search (students, staffs, guardians)
`Subject<string>` + `debounceTime(400)` + `distinctUntilChanged()` → calls service on 3+ chars.

### Dialog pattern
```typescript
// Opener
dialog.open(EntityDialogComponent, { data: { ...obj, action }, width: '620px' });
dialogRef.afterClosed().subscribe(result => {
  if (!result || result.event === 'Cancel') return;
  // result.event === 'Add' | 'Update'
});

// Dialog class
constructor(@Optional() @Inject(MAT_DIALOG_DATA) data) {
  this.local_data = { ...data };
  this.action = this.local_data['action'];
  delete this.local_data['action'];
}
doAction() { this.dialogRef.close({ event: this.action, data: this.local_data }); }
closeDialog() { this.dialogRef.close({ event: 'Cancel' }); }
```

### Date inputs in dialogs
Use `<input type="date" matInput>` — NOT `mat-datepicker`. Normalize ISO datetimes in the constructor: `value.substring(0, 10)`. Coerce empty string to null in `doAction()`: `effectiveTo: this.local_data.effectiveTo || null`.

### Breadcrumb
Each route's `data.urls` array: `[{ title: 'Dashboard', url: '/dashboards/dashboard1' }, { title: 'Section' }, { title: 'Page' }]`. Terminal item has no `url`.

---

## Sidebar (`src/app/layouts/full/vertical/sidebar/sidebar-data.ts`)

Sections active as of this session:
- **Home**: Dashboard
- **Academic**: Students, Guardians, Staff
- **Payroll**: Statutory Deductions (`/payroll/statutory`), PAYE Bands (`/payroll/paye-bands`)
- **Administration**: Subscriptions, Tenants

Operations and Finance sections are currently commented out (stubs for future modules).

---

## Services Built This Session

### `DashboardService` (`src/app/pages/dashboards/dashboard.service.ts`)
Fetches from 3 endpoints in parallel via `forkJoin`:
- `GET /users/api/v1/tenants/system/dashboard` → `SystemAdminDashboard`
- `GET /academics/api/v1/system/stats` → `SystemStatsDTO`
- `GET /billings/api/v1/system/stats` → `SystemStatsData`

Models in `src/app/pages/dashboards/dashboard.model.ts`.

### `PayrollConfigService` (`src/app/pages/payroll/payroll-config.service.ts`)
Base: `/billings/api/v1/payroll-config`
- `getStatutory / createStatutory / updateStatutory` — statutory deduction configs
- `getPayeBands / createPayeBand / updatePayeBand` — PAYE tax bands

---

## Dashboard (`/dashboards/dashboard1`)

`AppDashboard1Component` (standalone) fetches `DashboardStats` on init and passes to `AppTopCardsComponent` via `[stats]` and `[isLoading]`.

`AppTopCardsComponent` renders three labeled card sections:
- **Users & Platform** (5 cards, auto col-width): tenants, students, guardians, staff, audit logs
- **Academics** (6 cards, col-lg-2): reports, enrolled, classes, courses, active class courses, notifications
- **Finance** (4 cards, col-lg-3): journal lines, invoices, fee transactions, fee total

All other dashboard widgets (charts, fake tables) have been removed.

---

## App Routing (`src/app/app-routing.module.ts`)

All feature paths are lazy-loaded children of `FullComponent` (protected by `authGuard` + `roleGuard`):
```
/dashboards → DashboardsModule
/tenants    → TenantsModule
/subscription → SubscriptionModule
/students   → StudentsModule
/staffs     → StaffsModule
/guardians  → GuardiansModule
/payroll    → PayrollModule
```

---

## Build & Docker

```bash
# Dev
npm start                        # ng serve on :4200

# Production build
npm run build                    # outputs to dist/Modernize

# Docker
docker build -t skulba-admin .
docker run -p 4200:80 skulba-admin
# or
docker compose up --build

# Before Docker build: update src/environments/environment.production.ts
# with real apiBaseUrl, keycloakUrl, keycloakRealm, keycloakClient values
```

---

## Guards

- `authGuard` — `src/app/guards/auth.guard.ts` (Keycloak login check)
- `roleGuard` — `src/app/guards/role.guard.ts` (role-based access; redirects to `/access-denied`)

Both applied at `FullComponent` parent route — all child routes inherit protection automatically.
