import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  //array das imagens que serão exibidas no carousel
  images: string[] = [
    'https://s2-oglobo.glbimg.com/5d4BjkYykotKFxtGv41iLOMOp8A=/0x0:2355x1592/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/Z/T/Bo7lsdTdKS8PEdYuautg/107608847.jpg',
    'https://img.freepik.com/fotos-gratis/pizza-pizza-cheia-de-tomates-salame-e-azeitonas_140725-1200.jpg?t=st=1732580385~exp=1732583985~hmac=8ef5d83dd5c1a25989e71ba28fefbde7eb7de11b3083d0a0efb83650998f0556&w=740',
    'https://www.infomoney.com.br/wp-content/uploads/2019/06/pizza-2.jpg?fit=900%2C646&quality=50&strip=all'
  ];
  currentIndex: number = 0;
  //id do intervalo => usado para trocar as imagens
  intervalId: any;

  ngOnInit(): void {
    this.startCarousel();
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  //imagens mudam a cada 3s
  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }
}