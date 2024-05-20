import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl='http://16.16.205.235:8025'

  constructor(private http: HttpClient) { }

  getSignals():Observable<any>{
    return this.http.get(`${this.baseUrl}/traffic_light_status`)
  }

  Status(status:boolean):Observable<any>{
    return this.http.get(`${this.baseUrl}/reset/${status}`)
  }
}
