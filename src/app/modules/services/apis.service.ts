import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  url = environment.ApiUrl;

  constructor(private http:HttpClient) { }

  sendMessage(obj:any){
    return this.http.post(this.url+"/contact", obj);
  }

  getPostings(){
    return this.http.get(this.url + "/getPostings");
  }

  postingsDetails(jobId:any){
    return this.http.get(this.url + "/postings/"+ jobId);
  }

  saveCandidate(obj:FormData):Observable<any>{
    return this.http.post(this.url+"/applyPost", obj);
  }
}
