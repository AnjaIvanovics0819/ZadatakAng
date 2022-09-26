import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";

  constructor(private http:HttpClient) { }

  employees(){
     return this.http.get(this.url);
  }

  }
