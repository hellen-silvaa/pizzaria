import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService, Pizza } from '../../core/services/pizza.service';
import {
  IngredientService,
  Ingredient,
} from '../../core/services/ingredient.service';
import { IngredientStoreService } from '../../core/services/ingredient-store.service';
import { PizzaCardComponent } from '../../ui/pizza-card/pizza-card.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, PizzaCardComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  ingredientStore = inject(IngredientStoreService);
  pizzas: Pizza[] = [];
  ingredients: Ingredient[] = [];
  newPizza: Pizza = { id: 0, name: '', ingredients: [] };
  isEditing: boolean = false;

  constructor(
    private pizzaService: PizzaService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit() {
    this.loadPizzas();
    this.loadIngredients();
  }

  loadPizzas() {
    this.pizzaService
    .getPizzas()
    .subscribe((pizzas) => (
      this.pizzas = pizzas));
  }

  // Carrega lista de ingredientes do serviço
  loadIngredients() {
    this.ingredientService
      .getIngredients()
      .subscribe((ingredients) => (
        this.ingredients = ingredients));
  }

  // Manipula o envio do formulário (criar/editar pizza)
  onSubmit() {
    if (this.isEditing) {
      // Atualiza pizza existente
      this.pizzaService.updatePizza(
        this.newPizza).subscribe(() => {
        this.resetForm();
        this.loadPizzas();
      });
    } else {
      
      // Calcula próximo ID e cria nova pizza
      // const maxId = this.pizzas.reduce(
      //   (max, pizza) => (pizza.id > max ? pizza.id : max),
      //   0
      // );
      // this.newPizza.id = maxId + 1;
      this.pizzaService.addPizza(this.newPizza).subscribe(() => {
        this.resetForm();
        this.loadPizzas();
      });
    }
  }

  // Manipula clique no ingrediente (checkbox)
  handleIngredientClick(ingredient: any) {
    this.ingredientStore.toggleIngredientAction$.next(ingredient);
    this.addIngredient(ingredient);
  }

  // Adiciona ingrediente à pizza
  addIngredient(ingredient: any) {
    if (!this.newPizza.ingredients) {
      this.newPizza.ingredients = [];
    }
    // Verifica se ingrediente já existe
    const exists = this.newPizza.ingredients.some(
      (ing) => ing.id === ingredient.id
    );
    if (!exists) {
      this.newPizza.ingredients.push({ id: ingredient.id });
    }
  }

  // Remove ingrediente da pizza
  removeIngredient(ingredientId: number) {
    this.newPizza.ingredients = this.newPizza.ingredients.filter(
      (i) => i.id !== ingredientId
    );
  }

  // Prepara pizza para edição
  editPizza(pizza: Pizza) {
    this.newPizza = {...pizza, ingredients: pizza.ingredients
      .map((ingredient) => ({
        id: ingredient.id,
      })),
    };
    this.isEditing = true;
  }

  // Exclui pizza
  deletePizza(id: number) {
    this.pizzaService.deletePizza(id)
    .subscribe(() => {
      this.loadPizzas();
      this.resetForm();
    });
  }

  // Reseta formulário para estado inicial
  resetForm() {
    this.newPizza = { id: 0, name: '', ingredients: [] };
    this.isEditing = false;
  }

  // Obtém nome do ingrediente pelo ID
  getIngredientName(id: number): string | undefined {
    return this.ingredients
    .find((ingredient) =>
       ingredient.id === id)?.name;
  }

  // Obtém lista formatada de ingredientes da pizza
  getIngredientsList(pizza: Pizza): string {
    return pizza.ingredients
      .map(
        (i) =>
          this.ingredients.find((ingredient) => ingredient.id === i.id)?.name
      )
      .filter((name) => name !== undefined)
      .join(', ');
  }
}
