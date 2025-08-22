import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-birthday-wish',
  templateUrl: './birthday-wish.component.html',
  styleUrls: ['./birthday-wish.component.scss']
})
export class BirthdayWishComponent implements OnInit {
  happyText = "Happy Birthday Diii En Chellame...";
  typedText = "";
  private typingIndex = 0;
  circlePath = 'M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0';
currentSpeed = 10;
  isReversed = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.typeWriter(), 500);
    this.createBalloons();
    this.createConfetti();
    setInterval(() => this.createSparkle(), 300);

    // Click to create hearts
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      this.createHeart(event.clientX, event.clientY);
    });
  }

  private typeWriter(): void {
    if (this.typingIndex < this.happyText.length) {
      this.typedText += this.happyText.charAt(this.typingIndex);
      this.typingIndex++;
      setTimeout(() => this.typeWriter(), 150);
    } else {
      const heart = this.el.nativeElement.querySelector('#heart');
      const cake = this.el.nativeElement.querySelector('.cake');
      const photo = this.el.nativeElement.querySelector('.photo-frame');

      this.renderer.setStyle(heart, 'opacity', '1');
      this.renderer.addClass(cake, 'fade-in');
      this.renderer.addClass(photo, 'fade-in');
    }
  }

  private createBalloons(): void {
    const balloonsContainer = this.el.nativeElement.querySelector('#balloons');
    for (let i = 0; i < 15; i++) {
      const balloon = this.renderer.createElement('div');
      this.renderer.addClass(balloon, 'balloon');

      const size = Math.random() * 30 + 30;
      this.renderer.setStyle(balloon, 'width', `${size}px`);
      this.renderer.setStyle(balloon, 'height', `${size}px`);
      this.renderer.setStyle(balloon, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(balloon, 'animation-duration', `${Math.random() * 10 + 5}s`);
      this.renderer.setStyle(balloon, 'animation-delay', `${Math.random() * 5}s`);
      this.renderer.setStyle(balloon, 'background-color', this.getRandomColor());

      this.renderer.appendChild(balloonsContainer, balloon);
    }
  }

  private createConfetti(): void {
    const confettiContainer = this.el.nativeElement.querySelector('#confetti');
    for (let i = 0; i < 100; i++) {
      const confetti = this.renderer.createElement('div');
      this.renderer.addClass(confetti, 'confetti');
      this.renderer.setStyle(confetti, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(confetti, 'animation-duration', `${Math.random() * 3 + 2}s`);
      this.renderer.setStyle(confetti, 'animation-delay', `${Math.random() * 2}s`);
      this.renderer.setStyle(confetti, 'background-color', this.getRandomColor());
      this.renderer.appendChild(confettiContainer, confetti);
    }
  }

  private createSparkle(): void {
    const sparkle = this.renderer.createElement('div');
    this.renderer.addClass(sparkle, 'sparkle');
    this.renderer.setStyle(sparkle, 'left', `${Math.random() * 100}%`);
    this.renderer.setStyle(sparkle, 'top', `${Math.random() * 100}%`);
    this.renderer.appendChild(document.body, sparkle);

    setTimeout(() => sparkle.remove(), 1000);
  }

  private createHeart(x: number, y: number): void {
    const heart = this.renderer.createElement('div');
    heart.innerHTML = '❤';
    this.renderer.setStyle(heart, 'position', 'absolute');
    this.renderer.setStyle(heart, 'left', `${x}px`);
    this.renderer.setStyle(heart, 'top', `${y}px`);
    this.renderer.setStyle(heart, 'font-size', '2rem');
    this.renderer.setStyle(heart, 'color', '#ff5e62');
    this.renderer.setStyle(heart, 'z-index', '100');
    this.renderer.setStyle(heart, 'cursor', 'pointer');
    this.renderer.setStyle(heart, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(heart, 'animation', 'pulse 1s ease-out forwards');

    this.renderer.appendChild(document.body, heart);
    setTimeout(() => heart.remove(), 1000);
  }

  private getRandomColor(): string {
    const colors = ['#ff5e62', '#ff9966', '#41b3a3', '#79b4b8', '#f8bbd0', '#ba68c8', '#8e44ad', '#3498db', '#2ecc71'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  onClickCandle() {
    this.router.navigateByUrl('sparkle-content')
  }
}