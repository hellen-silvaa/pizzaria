import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CatalogComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzaria';
}