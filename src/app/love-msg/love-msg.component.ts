import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-love-msg',
  templateUrl: './love-msg.component.html',
  styleUrls: ['./love-msg.component.scss']
})
export class LoveMsgComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.createFloatingHearts();
    this.createInitialSparkles();
    this.startContinuousHearts();
  }

  createFloatingHearts(): void {
    const container = this.el.nativeElement.querySelector('.floating-hearts');
    
    for (let i = 0; i < 15; i++) {
      this.createSingleHeart(container);
    }
  }

  createSingleHeart(container: HTMLElement): void {
    const heart = this.renderer.createElement('div');
    this.renderer.addClass(heart, 'floating-heart');
    
    const size = 10 + Math.random() * 20;
    this.renderer.setStyle(heart, 'width', `${size}px`);
    this.renderer.setStyle(heart, 'height', `${size}px`);
    
    this.renderer.setStyle(heart, 'left', `${Math.random() * 100}%`);
    this.renderer.setStyle(heart, 'animationDelay', `${Math.random() * 8}s`);
    this.renderer.setStyle(heart, 'animationDuration', `${6 + Math.random() * 6}s`);
    
    const hue = 330 + Math.random() * 30;
    this.renderer.setStyle(heart, 'background', `hsla(${hue}, 100%, 70%, 0.8)`);
    this.renderer.setStyle(heart, 'opacity', '0');
    
    this.renderer.appendChild(container, heart);
    
    setTimeout(() => {
      if (heart.parentNode) {
        this.renderer.removeChild(container, heart);
      }
    }, 15000);
  }

  createSparkles(event: Event): void {
    let rect : any;
    if (event.target instanceof HTMLElement) {
      rect = event.target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
      this.createSingleSparkle(centerX, centerY);
    }
    
    // Pulse effect on click
    this.renderer.setStyle(event.target, 'transform', 'rotate(-45deg) scale(1.3)');
    setTimeout(() => {
      this.renderer.setStyle(event.target, 'transform', 'rotate(-45deg) scale(1)');
    }, 300);
    }  
  }

  createSingleSparkle(x: number, y: number): void {
    const sparkle = this.renderer.createElement('div');
    this.renderer.addClass(sparkle, 'sparkle');
    
    const size = 2 + Math.random() * 4;
    this.renderer.setStyle(sparkle, 'width', `${size}px`);
    this.renderer.setStyle(sparkle, 'height', `${size}px`);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 60;
    const sparkleX = x + Math.cos(angle) * distance;
    const sparkleY = y + Math.sin(angle) * distance;
    
    this.renderer.setStyle(sparkle, 'left', `${sparkleX}px`);
    this.renderer.setStyle(sparkle, 'top', `${sparkleY}px`);
    
    this.renderer.appendChild(document.body, sparkle);
    
    setTimeout(() => {
      if (sparkle.parentNode) {
        this.renderer.removeChild(document.body, sparkle);
      }
    }, 2000);
  }

  createInitialSparkles(): void {
    setTimeout(() => {
      const container = this.el.nativeElement.querySelector('.love-container');
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      for (let i = 0; i < 30; i++) {
        this.createSingleSparkle(centerX, centerY);
      }
    }, 1000);
  }

  startContinuousHearts(): void {
    setInterval(() => {
      if (Math.random() > 0.7) {
        const container = this.el.nativeElement.querySelector('.floating-hearts');
        this.createSingleHeart(container);
      }
    }, 2000);
  }

  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (Math.random() > 0.8) {
      this.createSingleSparkle(event.clientX, event.clientY);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    const container = this.el.nativeElement.querySelector('.floating-hearts');
    container.innerHTML = '';
    this.createFloatingHearts();
  }
}