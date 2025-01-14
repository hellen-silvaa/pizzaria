import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pizza {
  id: number;
  name: string;
  ingredients: { id: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost:3000/pizzas';

  constructor(private http: HttpClient) { }

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }

  addPizza(pizza: Pizza): Observable<Pizza> {
    // Ensure the ID is not set or is null
    const newPizza = { ...pizza, id: undefined };
    return this.http.post<Pizza>(this.apiUrl, newPizza);
  }

  updatePizza(pizza: Pizza): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${pizza.id}`, pizza);
  }

  deletePizza(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}