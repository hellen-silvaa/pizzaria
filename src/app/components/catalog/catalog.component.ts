import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService, Pizza } from '../../services/pizza.service';
import { IngredientService, Ingredient } from '../../services/ingredient.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { PizzaCardComponent } from '../pizza-card/pizza-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselComponent, PizzaCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  pizzas: Pizza[] = [];
  ingredients: Ingredient[] = [];
  searchTerm: string = ''; //busca digitado pelo usuário 
  selectedFilter: string = '';
  filteredPizzas: Pizza[] = []; // pizzas que passaram pelo filtro

  constructor(private pizzaService: PizzaService, private ingredientService: IngredientService) { }

  ngOnInit() {
    this.pizzas = this.pizzaService.getPizzas();
    this.ingredients = this.ingredientService.getIngredients();
    this.filterPizzas();
  }

  // metodo que filtra as pizzas com base no termo de busca e filtro selecionado
  filterPizzas() {
    this.filteredPizzas = this.pizzas.filter(pizza => {
      const matchesSearchTerm = pizza.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pizza.ingredients.some(i => i.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesFilter = this.selectedFilter ? pizza.ingredients.some(i => i.name.toLowerCase() === this.selectedFilter.toLowerCase()) : true;
      return matchesSearchTerm && matchesFilter;
    });
  }

  //metodo para obter a lista de ingredientes depois mapeia para obter somente o nome e junta separa ,
  getIngredientsList(pizza: Pizza): string {
    return pizza.ingredients.map(i => i.name).join(', ');
  }
}

//testar filtro
//1. verificar se o nome da pizza || ingrediente corresponde ao termo de busca
//2. Verificar se algum ingrediente corresponde ao filtro selecionado
//3. retorna true se a pizza corresponder ao termo