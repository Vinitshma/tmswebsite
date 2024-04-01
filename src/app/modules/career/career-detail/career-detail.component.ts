import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'careerdetail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent implements OnInit {

  jobId:any;
  jobdetails:any;

  constructor(private router:Router, private route: ActivatedRoute, private serv:ApisService){
    this.jobId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.serv.postingsDetails(this.jobId).subscribe((res:any)=>{
      // console.log(res.data);
      this.jobdetails = res.data[0];
    })
  }

  applyPost(){
    sessionStorage.setItem("JbTil", this.jobdetails?.JobTitle);
    this.router.navigateByUrl('/career/a/'+ this.jobdetails?.JobID);
  }

}
