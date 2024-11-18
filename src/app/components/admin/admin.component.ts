import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService, Pizza } from '../../services/pizza.service';
import { IngredientService, Ingredient } from '../../services/ingredient.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pizzas = signal<Pizza[]>([]);
  ingredients = signal<Ingredient[]>([]);
  newPizza: Pizza = { id: 0, name: '', ingredients: [], price: 0 };
  selectedPizza: Pizza | null = null;

  constructor(private pizzaService: PizzaService, private ingredientService: IngredientService) {}

  ngOnInit() {
    this.pizzas.set(this.pizzaService.getPizzas());
    this.ingredients.set(this.ingredientService.getIngredients());
  }

  createPizza() {
    this.pizzaService.addPizza(this.newPizza);
    this.pizzas.set(this.pizzaService.getPizzas());
    this.newPizza = { id: 0, name: '', ingredients: [], price: 0 };
  }

  editPizza(pizza: Pizza) {
    this.selectedPizza = { ...pizza };
  }

  updatePizza() {
    if (this.selectedPizza) {
      this.pizzaService.updatePizza(this.selectedPizza);
      this.pizzas.set(this.pizzaService.getPizzas());
      this.selectedPizza = null;
    }
  }

  deletePizza(pizza: Pizza) {
    this.pizzaService.deletePizza(pizza.id);
    this.pizzas.set(this.pizzaService.getPizzas());
  }

  addIngredientToPizza(ingredient: Ingredient) {
    if (this.selectedPizza && !this.selectedPizza.ingredients.includes(ingredient)) {
      this.selectedPizza.ingredients.push(ingredient);
    }
  }

  removeIngredientFromPizza(ingredient: Ingredient) {
    if (this.selectedPizza) {
      this.selectedPizza.ingredients = this.selectedPizza.ingredients.filter(i => i.id !== ingredient.id);
    }
  }

  getIngredientsList(pizza: Pizza): string {
    return pizza.ingredients.map(i => i.name).join(', ');
  }
}