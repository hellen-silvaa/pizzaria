import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss']
})
export class PizzaCardComponent {
  @Input() name!: string;
  @Input() ingredients!: string;
  @Input() imageUrl!: string;
}