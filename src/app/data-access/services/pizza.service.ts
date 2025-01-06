import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  providedIn: 'root' // Marca a classe como um serviço injetável e disponível em toda a aplicação
})
export class PizzaService {
  private apiUrl = 'http://localhost:3000/pizzas'; // URL da API JSON Server

  constructor(private http: HttpClient) {}

  // Método para obter a lista de pizzas
  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }

  // Método para adicionar uma nova pizza
  addPizza(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.apiUrl, pizza);
  }

  // Método para atualizar uma pizza existente
  updatePizza(updatedPizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.apiUrl}/${updatedPizza.id}`, updatedPizza);
  }

  // Método para deletar uma pizza existente
  deletePizza(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}