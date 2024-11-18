import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'admin', component: AdminComponent }
];