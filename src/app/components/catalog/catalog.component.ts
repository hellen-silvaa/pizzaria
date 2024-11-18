import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService, Pizza } from '../../services/pizza.service';
import { IngredientService, Ingredient } from '../../services/ingredient.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  pizzas: Pizza[] = [];
  ingredients: Ingredient[] = [];
  searchTerm: string = '';
  selectedFilter: string = '';
  filteredPizzas: Pizza[] = [];

  constructor(private pizzaService: PizzaService, private ingredientService: IngredientService) {}

  ngOnInit() {
    this.pizzas = this.pizzaService.getPizzas();
    this.ingredients = this.ingredientService.getIngredients();
    this.filterPizzas();
  }

  filterPizzas() {
    this.filteredPizzas = this.pizzas.filter(pizza => {
      const matchesSearchTerm = pizza.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pizza.ingredients.some(i => i.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesFilter = this.selectedFilter ? pizza.ingredients.some(i => i.name.toLowerCase() === this.selectedFilter.toLowerCase()) : true;
      return matchesSearchTerm && matchesFilter;
    });
  }

  getIngredientsList(pizza: Pizza): string {
    return pizza.ingredients.map(i => i.name).join(', ');
  }
}