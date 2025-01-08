import { Component, Input } from '@angular/core'; // Importa os decoradores Component e Input do Angular
import { CommonModule } from '@angular/common'; // Importa o módulo CommonModule do Angular

@Component({
  selector: 'app-pizza-card', // Seletor do componente
  standalone: true, // Indica que o componente é standalone
  imports: [CommonModule], // Importa o CommonModule
  templateUrl: './pizza-card.component.html', // Caminho para o template HTML
  styleUrls: ['./pizza-card.component.scss'] // Caminho para os estilos CSS
})
export class PizzaCardComponent {
  // Propriedade de entrada para o nome da pizza
  @Input() name!: string;
  // Propriedade de entrada para os ingredientes da pizza
  @Input() ingredients!: string;
  // Propriedade de entrada para a URL da imagem da pizza
  @Input() imageUrl!: string;
}