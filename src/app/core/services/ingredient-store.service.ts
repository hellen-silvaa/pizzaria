// Importação do HttpClient para fazer requisições HTTP
import { HttpClient } from '@angular/common/http';
// Importações do Angular core para gerenciamento de estado e injeção de dependência
import { computed, inject, Injectable, signal } from '@angular/core';
// Importação do modelo de Ingredient
import { Ingredient } from '../../models/ingredient.model';
// Operador para destruir observables quando componente é destruído
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// Operadores RxJS para manipulação de observables
import { catchError, delay, EMPTY, Subject, switchMap, tap } from 'rxjs';

// Interface que define a estrutura do estado dos ingredientes
export interface IngredientState {
  ingredients: Ingredient[]; // Lista de ingredientes
  status: 'idle' | 'loading' | 'error' | 'success'; // Estado atual
  error: string | null; // Mensagem de erro se houver
}

// Decorador que marca classe como serviço injetável em toda aplicação
@Injectable({
  providedIn: 'root',
})
export class IngredientStoreService {
  // Injeção do HttpClient
  private http = inject(HttpClient);

  // Estado inicial usando signals do Angular
  private state = signal<IngredientState>({
    ingredients: [],
    status: 'idle',
    error: null,
  });

  // Subject para emitir erros
  private error$ = new Subject<string>();

  // Observable que carrega ingredientes do backend
  private ingredientsLoaded$ = this.http
    .get<Ingredient[]>('http://localhost:3000/ingredients')
    .pipe(
      // Atualiza estado para loading
      tap(() => this.state.update((state) => ({ ...state, status: 'loading' }))),
      takeUntilDestroyed(),
      delay(2000), // Simula delay de rede
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      })
    );

  // Subject para alternar estado do ingrediente
  toggleIngredientAction$ = new Subject<Ingredient>();

  // Signals computados para dados derivados
  ingredients = computed(() => this.state().ingredients);
  status = computed(() => this.state().status);
  ingredientsUsados = computed(
    () => this.state().ingredients.filter((ingredient) => ingredient.usado).length
  );
  ingredientsNaoUsados = computed(
    () => this.state().ingredients.length - this.ingredientsUsados()
  );
  errorMessage = computed(() => this.state().error);

  constructor() {
    // Inscrição para carregar ingredientes iniciais
    this.ingredientsLoaded$.subscribe((ingredients) => {
      this.state.update((state) => ({ ...state, ingredients, status: 'success' }));
    });

    // Inscrição para alternar estado do ingrediente
    this.toggleIngredientAction$
      .pipe(
        takeUntilDestroyed(),
        switchMap((ingredient) =>
          this.http.patch<Ingredient>(
            `http://localhost:3000/ingredients/${ingredient.id}`,
            { usado: !ingredient.usado }
          )
        ),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      )
      .subscribe((Updatedingredient) => {
        // Atualiza estado com ingrediente modificado
        this.state.update((state) => ({
          ...state,
          ingredients: state.ingredients.map((ingredient) =>
            ingredient.id === Updatedingredient.id ? Updatedingredient : ingredient
          ),
        }));
      });

    // Inscrição para tratamento de erros
    this.error$.subscribe((error) => {
      this.state.update((state) => ({ ...state, error, status: 'error' }));
    });
  }
}