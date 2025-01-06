import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';

import { CarouselComponent } from './components/carousel/carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CatalogComponent, HeaderComponent, AdminComponent, CarouselComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzaria';
}