import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-career-apply',
  templateUrl: './career-apply.component.html',
  styleUrls: ['./career-apply.component.scss']
})
export class CareerApplyComponent implements OnInit {

  candidateForm!:FormGroup;
  submitted:boolean = false;
  resumeRequired:boolean = false;
  files:any;
  jobId:any;
  jobTitle:any;

  public minDate:Date = new Date(1980,0,1);
  public maxDate:Date = new Date();

  constructor(private router:Router, private route: ActivatedRoute, private toastr: ToastrService, private serv:ApisService){
    this.jobId = this.route.snapshot.paramMap.get('id');
    if(!['', undefined, null].includes(this.jobId)){
      this.jobTitle = sessionStorage.getItem('JbTil') || "";
    }
  }

  ngOnInit(): void {
    this.candidateForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      dob: new FormControl('', Validators.required),
      gender: new FormControl(''),
      phone: new FormControl('', Validators.required),
      eMail: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      abtYourself: new FormControl('', Validators.required),
      coverLetter: new FormControl('', Validators.required),
      
    });
  }

  get frm(){
    return this.candidateForm.controls;
  }

  submitForm(){
    if(this.files?.length > 0){
      this.resumeRequired = false;
    }else{
      this.resumeRequired = true;
    }

    if(this.candidateForm.valid && !this.resumeRequired){
      const obj = {
        fullName: this.candidateForm.value.fullName,
        dob: this.candidateForm.value.dob,
        gender: this.candidateForm.value.gender,
        phone: this.candidateForm.value.phone,
        eMail: this.candidateForm.value.eMail,
        address: this.candidateForm.value.address,
        abtYourself: this.candidateForm.value.abtYourself,
        coverLetter: this.candidateForm.value.coverLetter,
        jobId: this.jobId
      };
      
      const formData = new FormData();
      formData.append("resumes", this.files[0]);
      formData.append("obj", JSON.stringify(obj));

      this.serv.saveCandidate(formData).subscribe((res:any)=>{
        // console.log(res);
        this.toastr.success("Sucessfully Applied");
        this.candidateForm.reset();
      },(err)=>{
        console.log(err);
        this.toastr.error('Please try again later.' );
      });
    }else{
      this.submitted = true;
      this.resumeRequired = true;
    }
  }


  onFileSelected(event: any): void {
    this.files = event.target.files;
    if(this.files?.length > 0){
      this.resumeRequired = false;
    }else{
      this.resumeRequired = true;
    }
  }

  backCareer(){
    this.router.navigateByUrl('/career');
  }

}
