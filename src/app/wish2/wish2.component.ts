import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish2',
  templateUrl: './wish2.component.html',
  styleUrls: ['./wish2.component.scss'],
  encapsulation: ViewEncapsulation.None   // ensures small hearts pick up global CSS

})
export class Wish2Component implements AfterViewInit {
  @ViewChild('loader') loader!: ElementRef<HTMLDivElement>;
  @ViewChild('initialHeart') initialHeart!: ElementRef<HTMLDivElement>;
  @ViewChild('heartsContainer') heartsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('finalHighlight') finalHighlight!: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2, private router: Router) { }

  ngAfterViewInit(): void {
    // small delay to ensure layout is measured correctly
    // setTimeout(() => {
    //   this.renderer.addClass(this.loader.nativeElement, 'hide');
    //   this.startAnimation();
    // }, 2800);

    this.startAnimation();
    setTimeout(() => {
      // fade out the main big heart
      const mainHeart = this.initialHeart.nativeElement;
     this.renderer.setStyle(mainHeart, 'opacity', '1');
    this.renderer.addClass(mainHeart, 'pulse');

      
    const container = this.heartsContainer.nativeElement;
      this.renderer.removeClass(container, 'show');

      // after fade-out, show final pulse heart
      setTimeout(() => {
        this.showFinalPulseHeart();

        // wait for pulse, then navigate
        setTimeout(() => {
          this.router.navigateByUrl('love-msg');
        }, 2000);
      }, 1000);
    }, 12000);
  }

  private startAnimation() {
    const mainHeart = this.initialHeart.nativeElement;
    const container = this.heartsContainer.nativeElement;
    const highlight = this.finalHighlight.nativeElement;

    this.renderer.setStyle(mainHeart, 'opacity', '1');
    this.renderer.addClass(mainHeart, 'pulse');

    setTimeout(() => this.createHeartMosaic(mainHeart, container, highlight), 1800);
  }

  private createHeartMosaic(
    mainHeart: HTMLElement,
    container: HTMLElement,
    highlight: HTMLElement
  ) {
    this.renderer.removeClass(mainHeart, 'pulse');
    this.renderer.setStyle(mainHeart, 'opacity', '0');
    this.renderer.addClass(container, 'show');

    const colorsCount = 12;
    const smallHeartSize = 30;

    // container is 600x550; we compute center based on its own box
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const heartWidth = 500;
    const heartHeight = 470;

    const heartPoints = this.calculateHeartPoints(
      centerX,
      centerY,
      heartWidth,
      heartHeight,
      120
    );

    heartPoints.forEach((point, index) => {
      const heart = this.renderer.createElement('div');
      this.renderer.addClass(heart, 'small-heart');
      this.renderer.addClass(heart, `heart-color-${index % colorsCount}`);

      // random scatter start near center
      const startX = centerX + (Math.random() * 200 - 100);
      const startY = centerY + (Math.random() * 200 - 100);
      this.renderer.setStyle(heart, 'left', `${startX}px`);
      this.renderer.setStyle(heart, 'top', `${startY}px`);
      this.renderer.appendChild(container, heart);

      // animate into final position
      setTimeout(() => {
        this.renderer.setStyle(heart, 'left', `${point.x - smallHeartSize / 2}px`);
        this.renderer.setStyle(heart, 'top', `${point.y - smallHeartSize / 2}px`);
        this.renderer.setStyle(heart, 'opacity', '1');

        setTimeout(() => {
          this.renderer.addClass(heart, 'float');
          this.renderer.setStyle(heart, 'animationDelay', `${index * 0.02}s`);
        }, 1500);
      }, index * 25);
    });

    // highlight flash
    setTimeout(() => {
      this.renderer.setStyle(highlight, 'opacity', '0.8');
      setTimeout(() => this.renderer.setStyle(highlight, 'opacity', '0'), 1500);
    }, heartPoints.length * 25 + 1000);
  }

  private calculateHeartPoints(
    centerX: number,
    centerY: number,
    width: number,
    height: number,
    pointCount: number
  ) {
    const points: Array<{ x: number; y: number }> = [];
    const a = width / 2;
    const b = height / 2;

    // outline
    for (let i = 0; i < pointCount; i++) {
      const t = (i / pointCount) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      points.push({ x: centerX + (x * a) / 16, y: centerY - (y * b) / 16 });
    }

    // fill
    const innerPoints = Math.floor(pointCount * 0.7);
    for (let i = 0; i < innerPoints; i++) {
      const r = Math.sqrt(Math.random()) * 0.8;
      const t = Math.random() * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      points.push({
        x: centerX + (x * a * r) / 16,
        y: centerY - (y * b * r) / 16,
      });
    }
    return points;
  }

  private showFinalPulseHeart() {
    const container = this.heartsContainer.nativeElement;
    const pulseHeart = this.renderer.createElement('div');
    this.renderer.addClass(pulseHeart, 'final-heart');

    // place at center of container
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    this.renderer.setStyle(pulseHeart, 'left', `${centerX - 25}px`);
    this.renderer.setStyle(pulseHeart, 'top', `${centerY - 25}px`);

    this.renderer.appendChild(container, pulseHeart);

    // animate (pulse class added via CSS)
    setTimeout(() => {
      this.renderer.addClass(pulseHeart, 'pulse');
    }, 50);
  }

}