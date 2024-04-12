import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isSticky = false;
  isHomeRoute:boolean = true;

  constructor(private router: Router){ }

  ngOnInit(): void {
    this.getCurrentNav();

    this.handleMobileMenu();
    this.handleDropdownToggle();
  }

  getCurrentNav(){
    this.isHomeRoute = this.router.url === '/home';
   
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isHomeRoute = this.router.url === '/home';
    });
    // console.log(this.isHomeRoute);
  }

  @HostListener('document:scroll')
  onScroll(): void {
    this.headerStyle();
  }

  navigateTo(route:string){
    this.router.navigate([route]);
    document.body.classList.remove('crt_mobile_menu-visible');
  }

  handleMobileMenu(): void {
    const mobileMenu = document.querySelector('.crt_mobile_menu');
    if (mobileMenu) {
      document.querySelector('.navbar_togglers')?.addEventListener('click', () => {
        document.body.classList.toggle('crt_mobile_menu-visible');
      });
  
      document.querySelectorAll('.crt_mobile_menu .menu-backdrop, .crt_mobile_menu .close-btn')?.forEach(btn => {
        btn.addEventListener('click', () => {
          document.body.classList.remove('crt_mobile_menu-visible');
        });
      });
    }
  }

  handleDropdownToggle(): void {
    document.querySelectorAll('.crt_mobile_menu li.dropdown .dropdown-btn')?.forEach(btn => {
      (btn as HTMLDivElement).addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        const dropdownBtn = event.currentTarget as HTMLElement;
        const dropdownMenu = dropdownBtn.parentElement?.querySelector('ul.dropdown-menu') as HTMLElement | null;
  
        if (dropdownMenu) {
          const isOpen = dropdownMenu.style.display === 'block';
          dropdownMenu.style.display = isOpen ? 'none' : 'block';
          dropdownBtn.classList.toggle('open', !isOpen);
        }
  
        const openDropdowns = document.querySelectorAll('.crt_mobile_menu .dropdown-btn.open');
        openDropdowns.forEach(openBtn => {
          if (openBtn !== dropdownBtn) {
            openBtn.classList.remove('open');
            const openMenu = openBtn.parentElement?.querySelector('ul.dropdown-menu') as HTMLElement;
            openMenu.style.display = 'none';
          }
        });
  
        const outsideClickHandler = (e: MouseEvent) => {
          if (!dropdownBtn.contains(e.target as Node)) {
            dropdownMenu?.style.removeProperty('display');
            dropdownBtn.classList.remove('open');
            document.removeEventListener('click', outsideClickHandler);
          }
        };
  
        if (dropdownMenu?.style.display === 'block') {
          document.addEventListener('click', outsideClickHandler);
        } else {
          document.removeEventListener('click', outsideClickHandler);
        }
      });
    });
  }
  

  headerStyle(): void {
    const windowpos = window.scrollY || window.pageYOffset;
    const siteHeader = document.body;
    if (windowpos >= 250) {
      siteHeader.classList.add('fixed-header');
    } else {
      siteHeader.classList.remove('fixed-header');
    }
  }
  
}