import { Component, AfterViewInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sparkle-content',
  templateUrl: './sparkle-content.component.html',
  styleUrls: ['./sparkle-content.component.scss'],
  encapsulation: ViewEncapsulation.None  // 🔥 needed for animations to apply

})
export class SparkleContentComponent implements AfterViewInit {

  constructor(private router: Router) {

  }

  ngAfterViewInit() {
    const container = document.getElementById('sparkleContainer');
    if (!container) return;

    const colors = ['#fffacd', '#ffd700', '#87cefa', '#ff69b4', '#ffffff'];

    setInterval(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';

      sparkle.style.left = Math.random() * window.innerWidth + 'px';
      sparkle.style.top = Math.random() * window.innerHeight + 'px';

      // random color
      sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
      sparkle.style.boxShadow = `0 0 10px ${sparkle.style.background}, 0 0 20px ${sparkle.style.background}`;

      container.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 2000);
    }, 250);
  }

  onClickRam() {
    this.router.navigateByUrl('wish')
  }
}