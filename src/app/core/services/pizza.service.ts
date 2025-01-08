import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from './ingredient.service';

export interface Pizza {
  id: number;
  name: string;
  ingredients: { id: number }[]; // Apenas IDs dos ingredientes
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost:3000/pizzas'; // URL da sua API

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }

  addPizza(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.apiUrl, pizza);
  }

  updatePizza(pizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.apiUrl}/${pizza.id}`, pizza);
  }

  deletePizza(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}