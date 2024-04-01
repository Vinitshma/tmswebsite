import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers:[ApisService]
})
export class ContactsComponent {

  sitekey!: any;
  
  contactForm!: FormGroup;
  submitted:boolean = false;
  public captchaResolved: boolean = false;

  constructor(private fb: FormBuilder, private http:HttpClient, private toastr: ToastrService, private serv:ApisService) {
    this.sitekey = '6LeSkK8fAAAAAKVJwTJEU-8Bl_4IfiFrX2bdmRXr'; 
   }
  
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],  
    });

    this.initMap()
  }

  get frm(){
    return this.contactForm.controls;
  }

  handleCaptcha(res:any){
    this.captchaResolved = res.length > 0;
  }

  onSubmit(): void {
    if (this.contactForm.valid && this.captchaResolved != false) {
      const data = this.contactForm.value;

      const obj = {
        name: data.name,
        emailId:data.email,
        message: data.message
      };

      this.serv.sendMessage(obj).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.error == false){
            this.toastr.success("Your message has been submitted.","Thank you for contacting us!");
            this.contactForm.reset();
          }else{
            this.toastr.error('Please try again!');
          }
        }, (err)=>{
          this.toastr.error('Please try again!');
      });
      
    } else {
      this.submitted = true;
      if(this.captchaResolved == false && this.contactForm.valid){
        this.toastr.info('Please check the captcha.' );
      }
    }
  }  

  initMap(){
    const mapBind = document.getElementById('basic_map');
    var myLatLng = {lat: 12.968748735633614, lng: 80.24790118135033};

    var mapOptions = {
      center: myLatLng,
      zoom: 12,
      //@ts-ignore TS2304
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
    }
    //@ts-ignore TS2304
    var mapss = new google.maps.Map(mapBind, mapOptions);
    //@ts-ignore TS2304
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: mapss,
      title: 'Thirumoolar Software Pvt Ltd',
       //@ts-ignore TS2304
      animation: google.maps.Animation.DROP
    });
    
    //@ts-ignore TS2304
    var infoWindow = new google.maps.InfoWindow({
      content: 'Thirumoolar Software Pvt Ltd'
    });
  
    infoWindow.open(mapss, marker);
  }

  batchSize = 350;

  readExcel(event: any) {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();
  
    reader.onload = (e: any) => {
      const binarystr = new Uint8Array(e.target.result);
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'array', raw: true, cellFormula: false });
      console.log(wb.Sheets);
  
      const wsname = wb.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
      const data1 = this.convertDataTypes(data);
      console.log({ obj: data1 });
  
      this.uploadDataInBatches(data1);
    };
  
    reader.readAsArrayBuffer(file);
  }

  uploadDataInBatches(data: any[]) {
    let index = 0;
  
    const uploadBatch = () => {
      const batchData = data.slice(index, index + this.batchSize);
      if (batchData.length > 0) {
        this.uploadExcel(batchData).subscribe(
          (res: any) => {
            console.log(res);
            index += this.batchSize;
            uploadBatch();
          },
          (error: any) => {
            console.error('Error in uploadExcel:', error);
            if (error.status === 500) {
              console.error('Internal Server Error (500) encountered. Stopping batch processing.');
            } else {
              console.error('Unknown error occurred. Stopping batch processing.');
            }
          }
        );
      } else {
        console.log('All batches uploaded successfully.');
      }
    };
  
    uploadBatch();
  }
  

  convertDataTypes(data:any) {
    data.forEach((obj:any) => {
      if (obj.AC_NO) {
        obj.AC_NO = parseInt(obj.AC_NO, 10);
      }
      if (obj.PART_NO) {
        obj.PART_NO = parseInt(obj.PART_NO, 10);
      }
      if (obj.SECTION_NO) {
        obj.SECTION_NO = parseInt(obj.SECTION_NO, 10);
      }
      if (obj.SLNOINPART) {
        obj.SLNOINPART = parseInt(obj.SLNOINPART, 10);
      }
      if (obj.AGE) {
        obj.AGE = parseInt(obj.AGE, 10);
      }
      if (obj.ORG_LIST_NO) {
        obj.ORG_LIST_NO = parseInt(obj.ORG_LIST_NO, 10);
      }

      if (obj.DOB) {
        let dates = obj.DOB.split(' ');
        obj.DOB = dates[0]
      }
    });

    return data;
  }

  uploadExcel(obj:any){
    return this.http.post('http://localhost:5200' + "/bulkexcel", obj)
  }

}