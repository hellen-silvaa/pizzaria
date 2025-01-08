import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CatalogComponent } from './feature/catalog/catalog.component';
import { AdminComponent } from './feature/admin/admin.component';
import { authenticationGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authenticationGuard] },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' }
];

export const appRoutingProviders = [
  provideRouter(routes)
];