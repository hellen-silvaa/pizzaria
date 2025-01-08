import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService, Pizza } from '../../core/services/pizza.service';
import { IngredientService, Ingredient } from '../../core/services/ingredient.service';
import { CarouselComponent } from '../../ui/carousel/carousel.component';
import { PizzaCardComponent } from '../../ui/pizza-card/pizza-card.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselComponent, PizzaCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private pizzasSubject = new BehaviorSubject<Pizza[]>([]);
  pizzas$ = this.pizzasSubject.asObservable();
  ingredients$: Observable<Ingredient[]> | undefined;
  ingredients: Ingredient[] = [];
  searchTerm: string = ''; // busca digitado pelo usuário 
  selectedFilter: string = '';
  filteredPizzas: Pizza[] = []; // pizzas que passaram pelo filtro

  constructor(private pizzaService: PizzaService, private ingredientService: IngredientService) { }

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe((pizzas: Pizza[]) => {
      this.pizzasSubject.next(pizzas);
      this.filterPizzas();
    });
    this.ingredients$ = this.ingredientService.getIngredients();
    this.ingredients$.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  // método que filtra as pizzas com base no termo de busca e filtro selecionado
  filterPizzas() {
    this.pizzas$.subscribe(pizzas => {
      this.filteredPizzas = pizzas.filter(pizza => {
        const matchesSearchTerm = pizza.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          pizza.ingredients.some((i: { id: number }) => {
            const ingredient = this.ingredients.find(ing => ing.id === i.id);
            return ingredient ? ingredient.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : false;
          });
        const matchesFilter = this.selectedFilter ? pizza.ingredients.some((i: { id: number }) => {
          const ingredient = this.ingredients.find(ing => ing.id === i.id);
          return ingredient ? ingredient.name.toLowerCase() === this.selectedFilter.toLowerCase() : false;
        }) : true;
        return matchesSearchTerm && matchesFilter;
      });
    });
  }

  // método para obter a lista de ingredientes depois mapeia para obter somente o nome e junta separa ,
  getIngredientsList(pizza: Pizza): string {
    return pizza.ingredients.map((i: { id: number }) => {
      const ingredient = this.ingredients.find(ing => ing.id === i.id);
      return ingredient ? ingredient.name : '';
    }).join(', ');
  }
}