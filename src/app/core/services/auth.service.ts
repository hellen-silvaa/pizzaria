// Importa o decorador 'Injectable' do Angular para permitir a injeção de dependências
import { Injectable } from '@angular/core';

// Define a classe como um serviço injetável e disponível na raiz do aplicativo
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Propriedade privada que armazena o estado de autenticação do usuário
  private isLoggedIn = false;

  // Método para realizar o login, alterando o estado de autenticação para 'true'
  login(): void {
    this.isLoggedIn = true;
  }

  // Método para realizar o logout, alterando o estado de autenticação para 'false'
  logout(): void {
    this.isLoggedIn = false;
  }

  // Método que verifica se o usuário está autenticado, retornando o valor de 'isLoggedIn'
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}