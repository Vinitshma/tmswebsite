import { AfterContentInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterContentInit, OnDestroy {
  constructor(private elementRef: ElementRef) {}

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.gsapAnimation()
    }, 0);
  }

  gsapAnimation(){
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(
      this.elementRef.nativeElement.querySelectorAll('.card_val_cont'),
      {
        scrollTrigger: {
          trigger:
            this.elementRef.nativeElement.querySelector('.value_container'),
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
      }
    );

  }

  ngOnDestroy(): void {
    let triggers = ScrollTrigger.getAll();
    gsap.killTweensOf('*');
    gsap.globalTimeline.clear();
    triggers.forEach((trigger) => {
      trigger.disable();
      trigger.kill();
      ScrollTrigger.removeEventListener("refresh", this.gsapAnimation);
    });
  }

}
