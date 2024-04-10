import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  template:'<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  ngOnInit(): void { }

}
