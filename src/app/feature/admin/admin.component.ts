import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService, Pizza } from '../../core/services/pizza.service';
import { IngredientService, Ingredient } from '../../core/services/ingredient.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pizzas: Pizza[] = [];
  ingredients: Ingredient[] = [];
  newPizza: Pizza = { id: 0, name: '', ingredients: [] };
  selectedPizza: Pizza | null = null;
  isEditing: boolean = false;
  selectedIngredient: string = '';
  newIngredient: Ingredient = { id: 0, name: '' };

  constructor(private pizzaService: PizzaService, private ingredientService: IngredientService) { }

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe((pizzas: Pizza[]) => this.pizzas = pizzas);
    this.ingredientService.getIngredients().subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  onSubmit() {
    if (this.isEditing) {
      this.pizzaService.updatePizza(this.newPizza).subscribe(() => {
        this.resetForm();
        this.pizzaService.getPizzas().subscribe((pizzas: Pizza[]) => this.pizzas = pizzas);
      });
    } else {
      // Calcular o próximo ID
      const maxId = this.pizzas.reduce((max, pizza) => pizza.id > max ? pizza.id : max, 0);
      this.newPizza.id = maxId + 1;

      this.pizzaService.addPizza(this.newPizza).subscribe(() => {
        this.resetForm();
        this.pizzaService.getPizzas().subscribe((pizzas: Pizza[]) => this.pizzas = pizzas);
      });
    }
  }

  addIngredient() {
    const ingredient = this.ingredients.find(i => i.name === this.selectedIngredient);
    if (ingredient && !this.newPizza.ingredients.some(i => i.id === ingredient.id)) {
      this.newPizza.ingredients.push({ id: ingredient.id });
    }
    this.selectedIngredient = '';
  }

  removeIngredient(ingredientId: number) {
    this.newPizza.ingredients = this.newPizza.ingredients.filter(i => i.id !== ingredientId);
  }

  editPizza(pizza: Pizza) {
    this.newPizza = { ...pizza, ingredients: pizza.ingredients.map(ingredient => ({ id: ingredient.id })) };
    this.isEditing = true;
  }

  deletePizza(id: number) {
    this.pizzaService.deletePizza(id).subscribe(() => {
      this.pizzaService.getPizzas().subscribe((pizzas: Pizza[]) => this.pizzas = pizzas);
      this.resetForm();
    });
  }

  resetForm() {
    this.newPizza = { id: 0, name: '', ingredients: [] };
    this.selectedIngredient = '';
    this.isEditing = false;
  }

  getIngredientsList(pizza: Pizza): string {
    return pizza.ingredients
      .map(i => this.ingredients.find(ingredient => ingredient.id === i.id)?.name)
      .filter(name => name !== undefined)
      .join(', ');
  }

  getSelectedIngredientsList(): string {
    return this.newPizza.ingredients
      .map(i => this.ingredients.find(ingredient => ingredient.id === i.id)?.name)
      .filter(name => name !== undefined)
      .join(', ');
  }

  getIngredientName(id: number): string | undefined {
    return this.ingredients.find(ingredient => ingredient.id === id)?.name;
  }

  isIngredientSelected(ingredient: Ingredient): boolean {
    return this.newPizza.ingredients.some(i => i.id === ingredient.id);
  }

  addNewIngredient() {
    this.ingredientService.addIngredient(this.newIngredient).subscribe(() => {
      this.newIngredient = { id: 0, name: '' };
      this.ingredientService.getIngredients().subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
    });
  }

  updateIngredient(ingredient: Ingredient) {
    this.ingredientService.updateIngredient(ingredient).subscribe(() => {
      this.ingredientService.getIngredients().subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
    });
  }

  deleteIngredient(id: number) {
    this.ingredientService.deleteIngredient(id).subscribe(() => {
      this.ingredientService.getIngredients().subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
    });
  }
}