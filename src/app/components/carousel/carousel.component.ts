import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  images: string[] = [
    'https://img.freepik.com/fotos-gratis/pizza-de-calabresa-em-cima-da-mesa_140725-5396.jpg?t=st=1732580342~exp=1732583942~hmac=97715432a5ce6f2962186e061922493b81167d1fd0b916e48cdc100ccf066405&w=996',
    'https://img.freepik.com/fotos-gratis/pizza-pizza-cheia-de-tomates-salame-e-azeitonas_140725-1200.jpg?t=st=1732580385~exp=1732583985~hmac=8ef5d83dd5c1a25989e71ba28fefbde7eb7de11b3083d0a0efb83650998f0556&w=740',
    'https://img.freepik.com/vetores-gratis/bonito-pizza-comida-sorrindo-ilustracao-do-icone-do-vetor-dos-desenhos-animados-conceito-de-icone-de-objeto-de-comida-isolado-premium_138676-6379.jpg?t=st=1732580405~exp=1732584005~hmac=6cf6aa499915a35c512b73feafac64164d7c53163463b33b4ef996da4f4e17c2&w=740'
  ];
  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }
}