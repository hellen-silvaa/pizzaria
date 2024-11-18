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
    { id: 1, name: 'Tomate' },
    { id: 2, name: 'Muçarela' },
    { id: 3, name: 'Pepperoni' },
    { id: 4, name: 'Queijo' },
    { id: 5, name: 'Carne seca' },
    { id: 6, name: 'Frango' },
    { id: 7, name: 'Catupiry' },
    { id: 8, name: 'Presunto' },
    { id: 9, name: 'Azeitonas' },
    { id: 10, name: 'Orégano' },
    { id: 11, name: 'Requeijão' },
    { id: 12, name: 'Bacon' },
    { id: 13, name: 'Rúcula' },
    { id: 14, name: 'Berinjela' },
    { id: 15, name: 'Cheddar' },
    { id: 16, name: 'Chocolate' },
    { id: 17, name: 'Coco ralado' },
    { id: 18, name: 'Goiabada' },
    { id: 19, name: 'Chocolate' }
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }
}