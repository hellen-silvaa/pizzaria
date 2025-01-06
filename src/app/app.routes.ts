import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from '../app/services/auth.guard';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' }
];

export const appRoutingProviders = [
  provideRouter(routes)
];