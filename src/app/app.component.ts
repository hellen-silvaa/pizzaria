import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CatalogComponent } from './feature/catalog/catalog.component';
import { HeaderComponent } from './ui/header/header.component';
import { AdminComponent } from './feature/admin/admin.component';

import { CarouselComponent } from './ui/carousel/carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CatalogComponent, HeaderComponent, AdminComponent, CarouselComponent, FontAwesomeModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzaria';
}