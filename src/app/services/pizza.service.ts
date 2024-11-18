import { Injectable } from '@angular/core';

export interface Ingredient {
  id: number;
  name: string;
}

export interface Pizza {
  id: number;
  name: string;
  ingredients: Ingredient[];

}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private pizzas: Pizza[] = [
    { id: 1, name: 'Margherita', ingredients: [{ id: 1, name: 'Tomato' }, { id: 2, name: 'Mozzarella' }]},
    { id: 2, name: 'Pepperoni', ingredients: [{ id: 3, name: 'Pepperoni' }, { id: 4, name: 'Cheese' }]},
    // Adicione mais pizzas conforme necessário
  ];

  getPizzas(): Pizza[] {
    return this.pizzas;
  }

  addPizza(pizza: Pizza) {
    pizza.id = this.pizzas.length + 1;
    this.pizzas.push(pizza);
  }

  updatePizza(updatedPizza: Pizza) {
    const index = this.pizzas.findIndex(pizza => pizza.id === updatedPizza.id);
    if (index !== -1) {
      this.pizzas[index] = updatedPizza;
    }
  }

  deletePizza(id: number) {
    this.pizzas = this.pizzas.filter(pizza => pizza.id !== id);
  }
}