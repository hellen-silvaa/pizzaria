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
  pizzas = signal<Pizza[]>([]); //array de objetos vaziu de pizzas
  ingredients = signal<Ingredient[]>([]);
  newPizza: Pizza = { id: 0, name: '', ingredients: [] };
  selectedPizza: Pizza | null = null;
  isEditing: boolean = false;
  selectedIngredient: string = '';

  constructor(private pizzaService: PizzaService, private ingredientService: IngredientService) { }

  //  inicializa as listas de pizzas e ingredientes chamando os serviços 
  ngOnInit() {
    this.pizzas.set(this.pizzaService.getPizzas());
    this.ingredients.set(this.ingredientService.getIngredients());
  }

  // adiciona ou atualiza a pizza 
  onSubmit() {
    if (this.isEditing) {
      this.pizzaService.updatePizza(this.newPizza);
    } else {
      this.pizzaService.addPizza(this.newPizza);
    }

    // reseta o form para o estado inicial e atualiza a lista de pizzas
    this.resetForm();
    this.pizzas.set(this.pizzaService.getPizzas());
  }

  addIngredient() {
    //add o ingrediente se ele não estiver já presente na lista de ingredientes da pizza
    const ingredient = this.ingredients().find(i => i.name === this.selectedIngredient);
    if (ingredient && !this.newPizza.ingredients.some(i => i.id === ingredient.id)) {
      this.newPizza.ingredients.push(ingredient);
    }
    // Reseta o ingrediente selecionado
    this.selectedIngredient = '';
  }

  removeIngredient(ingredient: Ingredient) {
    this.newPizza.ingredients = this.newPizza.ingredients.filter(i => i.id !== ingredient.id);
  }

  editPizza(pizza: Pizza) {
    this.newPizza = { ...pizza };
    this.isEditing = true;
  }

  deletePizza(id: number) {
    this.pizzaService.deletePizza(id);
    this.pizzas.set(this.pizzaService.getPizzas());
    this.resetForm();
  }

  resetForm() {
    this.newPizza = { id: 0, name: '', ingredients: [] };
    this.selectedIngredient = '';
    this.isEditing = false;
  }

  // metodo para retornar uma string com os  ingredientes da pizza
  getIngredientsList(pizza: Pizza): string {
    return pizza.ingredients.map(i => i.name).join(', ');
  }

  // ""  com os nomes dos ingredientes selecionados
  getSelectedIngredientsList(): string {
    return this.newPizza.ingredients.map(i => i.name).join(', ');
  }
  //verifica se o ingrediente já está selecionado 
  isIngredientSelected(ingredient: Ingredient): boolean {
    return this.newPizza.ingredients.some(i => i.id === ingredient.id);
  }
}
