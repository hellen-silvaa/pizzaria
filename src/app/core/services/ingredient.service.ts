import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Ingredient {
  id: number;
  name: string;
}

export interface IngredientState {
  ingredients: Ingredient[];
  status: 'idle' | 'loading' | 'error' | 'success';
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'http://localhost:3000/ingredients'; // URL da sua API
  private http = inject(HttpClient);

  private state = signal<IngredientState>({
    ingredients: [],
    status: 'idle',
    error: null,
  });

  private error$ = new Subject<string>();

  ingredients = computed(() => this.state().ingredients);
  status = computed(() => this.state().status);
  errorMessage = computed(() => this.state().error);

  constructor() {
    this.loadIngredients();
    this.subscribeToErrors();
  }

  private loadIngredients() {
    this.http.get<Ingredient[]>(this.apiUrl).pipe(
      tap(() => this.setLoadingState()),
      catchError((error) => this.handleError(error))
    ).subscribe((ingredients) => this.setIngredients(ingredients));
  }

  private subscribeToErrors() {
    this.error$.subscribe((error) => this.setErrorState(error));
  }

  private setLoadingState() {
    this.state.update((state) => ({ ...state, status: 'loading' }));
  }

  private setIngredients(ingredients: Ingredient[]) {
    this.state.update((state) => ({ ...state, ingredients, status: 'success' }));
  }

  private setErrorState(error: string) {
    this.state.update((state) => ({ ...state, status: 'error', error }));
  }

  private handleError(error: any) {
    this.error$.next(error.message);
    return EMPTY;
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl);
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.apiUrl, ingredient).pipe(
      tap(() => this.setLoadingState()),
      tap((newIngredient) => this.addNewIngredient(newIngredient)),
      catchError((error) => this.handleError(error))
    );
  }

  private addNewIngredient(newIngredient: Ingredient) {
    this.state.update((state) => {
      // Calcula o próximo ID baseado no maior ID atual da lista
      const lastId = state.ingredients.length > 0 
        ? Math.max(...state.ingredients.map(i => i.id)) 
        : 0;
  
      const newId = lastId + 1;
  
      return {
        ...state,
        ingredients: [...state.ingredients, { ...newIngredient, id: newId }],
        status: 'success',
      };
    });
  }
  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/${ingredient.id}`, ingredient).pipe(
      tap(() => this.setLoadingState()),
      tap((updatedIngredient) => this.updateLocalIngredient(updatedIngredient)),
      catchError((error) => this.handleError(error))
    );
  }

  private updateLocalIngredient(updatedIngredient: Ingredient) {
    this.state.update((state) => ({
      ...state,
      ingredients: state.ingredients.map((i) =>
        i.id === updatedIngredient.id ? updatedIngredient : i
      ),
      status: 'success',
    }));
  }

  deleteIngredient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.setLoadingState()),
      tap(() => this.removeLocalIngredient(id)),
      catchError((error) => this.handleError(error))
    );
  }

  private removeLocalIngredient(id: number) {
    this.state.update((state) => ({
      ...state,
      ingredients: state.ingredients.filter((i) => i.id !== id),
      status: 'success',
    }));
  }
}