// Importa a função 'inject' do Angular para injeção de dependências
import { inject } from '@angular/core';

// Importa o tipo 'CanActivateFn' do Angular Router para definir guardas de rota
import { CanActivateFn } from '@angular/router';

// Importa o serviço de autenticação personalizado
import { AuthService } from '../services/auth.service';

// Importa o serviço de roteamento do Angular
import { Router } from '@angular/router';

// Define a função de guarda de autenticação como uma constante exportada
export const authenticationGuard: CanActivateFn = () => {
  // Injeta o serviço de autenticação
  const authService = inject(AuthService);
  
  // Injeta o serviço de roteamento
  const router = inject(Router);

  // Verifica se o usuário está autenticado
  if (authService.isAuthenticated()) {
    // Se estiver autenticado, permite o acesso à rota retornando 'true'
    return true;
  } else {
    // Se não estiver autenticado, exibe um alerta
    alert('Você não é administrador. Precisa logar.');
    
    // Redireciona o usuário para a rota raiz ('/')
    router.navigate(['/']);
    
    // Bloqueia o acesso à rota retornando 'false'
    return false;
  }
};

//Sim, o authenticationGuard é uma função que implementa a 
// interface CanActivateFn. Ela é usada para proteger rotas 
// no Angular, verificando se o usuário está autenticado 
// antes de permitir o acesso à rota.