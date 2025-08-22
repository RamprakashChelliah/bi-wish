import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

type Heart = {
  id: number;
  top: number;       // NEW → always start above
  left: number;      // starting horizontal position
  size: string;
  duration: string;
  delay: string;
  rot: string;
  driftX: string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('wrapperRef', { static: true }) wrapperRef!: ElementRef<HTMLElement>;
  hearts: Heart[] = [];
  private idSeq = 0;
  private snowTimer?: any;

  /** Toggle this for sparkle vs snow */
  snowMode = true;

  constructor(private router: Router){

  }

  ngOnInit() {
    if (this.snowMode) this.startSnow();
  }

  /** Start continuous falling hearts */
  private startSnow() {
    const wrapper = this.wrapperRef.nativeElement.getBoundingClientRect();

    this.snowTimer = setInterval(() => {
      const left = Math.random() * wrapper.width;
      const size = `${14 + Math.floor(Math.random() * 18)}px`;
      const duration = `${6 + Math.random() * 5}s`; // fall speed
      const delay = `${Math.random() * 2}s`;
      const driftX = `${Math.random() * 100 - 50}px`; // -50px to +50px drift
      const rot = `${Math.floor(Math.random() * 360)}deg`;

      const heart: Heart = {
        id: ++this.idSeq,
        top: -40, // always start slightly above wrapper
        left,
        size,
        duration,
        delay,
        rot,
        driftX,
      };


      this.hearts.push(heart);

      // remove after animation ends
      setTimeout(() => {
        this.hearts = this.hearts.filter(h => h.id !== heart.id);
      }, (parseFloat(duration) + parseFloat(delay)) * 1000 + 500);
    }, 400); // new heart every 400ms
  }

  ngOnDestroy() {
    if (this.snowTimer) clearInterval(this.snowTimer);
  }

  trackById(_: number, h: Heart) {
    return h.id;
  }

  onClickButton(){
    this.router.navigateByUrl("birthday-wish");
  }
}