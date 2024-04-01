import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit, OnDestroy {

  jobDetails:any;

  constructor(private elementRef: ElementRef, private router:Router, private serv: ApisService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.gsapAnimation()
    }, 0);

    this.serv.getPostings().subscribe((res:any)=>{
      // console.log(res);
      this.jobDetails = res.data;
    })
  }

  gsapAnimation(){
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(this.elementRef.nativeElement.querySelectorAll('.cr2_div'), {
      scrollTrigger: {
        trigger: this.elementRef.nativeElement.querySelector('.left_container'),
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      stagger: 0.2
    });

    gsap.from('.cr1_image', { 
      duration:0.3,
      opacity:0,
      x:20,
      delay:0.3
    });
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

  scrollTo(openings: string): void {
    const element = document.querySelector(`#${openings}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  careerDetail(jobId:any){
    // console.log(jobId);
    this.router.navigateByUrl('/career/d/'+jobId)
  }

}
