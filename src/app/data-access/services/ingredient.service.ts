import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

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
  private apiUrl = 'http://localhost:3000/ingredients';
  private state = new BehaviorSubject<IngredientState>({
    ingredients: [],
    status: 'idle',
    error: null
  });
  private error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadIngredients();
  }

  private loadIngredients() {
    this.http.get<Ingredient[]>(this.apiUrl).pipe(
      tap(() => this.updateState({ status: 'loading' })),
      catchError(error => {
        this.error$.next(error.message);
        this.updateState({ status: 'error', error: error.message });
        return EMPTY;
      })
    ).subscribe(ingredients => {
      this.updateState({ ingredients, status: 'success', error: null });
    });
  }

  private updateState(partialState: Partial<IngredientState>) {
    this.state.next({ ...this.state.getValue(), ...partialState });
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.state.asObservable().pipe(
      map((state: IngredientState) => state.ingredients)
    );
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.apiUrl, ingredient).pipe(
      tap(() => this.loadIngredients()),
      catchError(error => {
        this.error$.next(error.message);
        this.updateState({ status: 'error', error: error.message });
        return EMPTY;
      })
    );
  }

  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/${ingredient.id}`, ingredient).pipe(
      tap(() => this.loadIngredients()),
      catchError(error => {
        this.error$.next(error.message);
        this.updateState({ status: 'error', error: error.message });
        return EMPTY;
      })
    );
  }

  deleteIngredient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadIngredients()),
      catchError(error => {
        this.error$.next(error.message);
        this.updateState({ status: 'error', error: error.message });
        return EMPTY;
      })
    );
  }
}