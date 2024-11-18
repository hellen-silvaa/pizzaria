import { Injectable } from '@angular/core';

export interface Ingredient {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredients: Ingredient[] = [
    { id: 1, name: 'Tomato' },
    { id: 2, name: 'Mozzarella' },
    { id: 3, name: 'Pepperoni' },
    { id: 4, name: 'Cheese' },
    // Adicione mais ingredientes conforme necessário
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }
}