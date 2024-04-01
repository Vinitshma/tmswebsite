import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { gsap } from 'gsap';
import { filter } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isSticky = false;
  isHomeRoute:boolean = true;

  constructor(private route: ActivatedRoute, private router: Router){ }

  ngOnInit(): void {
    this.getCurrentNav();
    // gsap.from('.content', { opacity: 0, duration: 1, y: 50, stagger: 0.3 });

    this.checkAndAppendDropdownBtns();
    this.handleMobileMenu();
    this.handleDropdownToggle();
    this.handleHamburgerMenuAnimation();
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

  checkAndAppendDropdownBtns(): void {
    const headerDropdowns = document.querySelectorAll('header .navbar_nav li.dropdown ul') as NodeListOf<HTMLElement>;;
    const megaMenuDropdowns = document.querySelectorAll('header .navbar_nav li.mega_menu ul') as NodeListOf<HTMLElement>;;
    const mobileHeaderDropdowns = document.querySelectorAll('.crt_mobile_menu .navbar_nav li.dropdown ul') as NodeListOf<HTMLElement>;;
    const mobileMegaMenuDropdowns = document.querySelectorAll('.crt_mobile_menu .navbar_nav li.mega_menu ul') as NodeListOf<HTMLElement>;;

    this.appendDropdownBtn(headerDropdowns);
    this.appendDropdownBtn(megaMenuDropdowns);
    this.appendDropdownBtn(mobileHeaderDropdowns);
    this.appendDropdownBtn(mobileMegaMenuDropdowns);
  }

  appendDropdownBtn(elements: NodeListOf<HTMLElement>): void {
    elements.forEach(element => {
      const dropdownBtn = document.createElement('div');
      dropdownBtn.className = 'dropdown-btn';
      dropdownBtn.innerHTML = '<span class="fa fa-angle-down"></span>';
      const closestLi = element.closest('li');
      if (closestLi) {
        closestLi.appendChild(dropdownBtn);
      }
    });
  }

  handleMobileMenu(): void {
    const mobileMenu = document.querySelector('.crt_mobile_menu');
    if (mobileMenu) {
      const mobileMenuContent = document.querySelector('.header .header_content_collapse .navigation_menu')?.innerHTML;
      mobileMenu.querySelector('.menu-box .menu-outer')?.insertAdjacentHTML('beforeend', mobileMenuContent || '');

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
  

  handleHamburgerMenuAnimation(): void {
    document.querySelectorAll('.hamburger_menu')?.forEach(menu => {
      menu.addEventListener('click', () => {
        menu.classList.toggle('is-active');
      });
    });

    document.querySelector('.crt_mobile_menu .menu-backdrop')?.addEventListener('click', () => {
      document.querySelector('.hamburger_menu')?.classList.remove('is-active');
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
    

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.pageYOffset > 270;
  }

}
