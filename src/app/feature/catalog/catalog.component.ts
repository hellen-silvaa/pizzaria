// Importa os decoradores e módulos necessários do Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importa os serviços de Pizza e Ingrediente
import { PizzaService, Pizza } from '../../core/services/pizza.service';
import { IngredientService, Ingredient } from '../../core/services/ingredient.service';

// Importa os componentes de UI
import { CarouselComponent } from '../../ui/carousel/carousel.component';
import { PizzaCardComponent } from '../../ui/pizza-card/pizza-card.component';

// Importa classes do RxJS para manipulação de observables
import { BehaviorSubject, Observable } from 'rxjs';

// Define o componente com seu seletor, template e estilos
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselComponent, PizzaCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  // Sujeito para armazenar a lista de pizzas
  private pizzasSubject = new BehaviorSubject<Pizza[]>([]);
  
  // Observable derivado do sujeito de pizzas
  pizzas$ = this.pizzasSubject.asObservable();
  
  // Observable para a lista de ingredientes
  ingredients$: Observable<Ingredient[]> | undefined;
  
  // Array para armazenar os ingredientes
  ingredients: Ingredient[] = [];
  
  // Termo de busca digitado pelo usuário
  searchTerm: string = '';
  
  // Filtro selecionado pelo usuário
  selectedFilter: string = '';
  
  // Array para armazenar as pizzas filtradas
  filteredPizzas: Pizza[] = [];

  // Injeta os serviços de Pizza e Ingrediente no construtor
  constructor(private pizzaService: PizzaService, private ingredientService: IngredientService) { }

  // Método chamado ao inicializar o componente
  ngOnInit() {
    // Carrega as pizzas ao inicializar
    this.pizzaService.getPizzas().subscribe((pizzas: Pizza[]) => {
      this.pizzasSubject.next(pizzas);
      this.filterPizzas();
    });
    
    // Carrega os ingredientes ao inicializar
    this.ingredients$ = this.ingredientService.getIngredients();
    this.ingredients$.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  // Método que filtra as pizzas com base no termo de busca e filtro selecionado
  filterPizzas() {
    this.pizzas$.subscribe(pizzas => {
      this.filteredPizzas = pizzas.filter(pizza => {
        // Verifica se o nome da pizza ou algum ingrediente corresponde ao termo de busca
        const matchesSearchTerm = pizza.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          pizza.ingredients.some((i: { id: number }) => {
            const ingredient = this.ingredients.find(ing => ing.id === i.id);
            return ingredient ? ingredient.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : false;
          });
        
        // Verifica se algum ingrediente corresponde ao filtro selecionado
        const matchesFilter = this.selectedFilter ? pizza.ingredients.some((i: { id: number }) => {
          const ingredient = this.ingredients.find(ing => ing.id === i.id);
          return ingredient ? ingredient.name.toLowerCase() === this.selectedFilter.toLowerCase() : false;
        }) : true;
        
        // Retorna true se a pizza corresponder ao termo de busca e ao filtro
        return matchesSearchTerm && matchesFilter;
      });
    });
  }

  // Método para obter a lista de ingredientes de uma pizza como string
  getIngredientsList(pizza: Pizza): string {
    return pizza.ingredients.map((i: { id: number }) => {
      const ingredient = this.ingredients.find(ing => ing.id === i.id);
      return ingredient ? ingredient.name : '';
    }).join(', ');
  }
}