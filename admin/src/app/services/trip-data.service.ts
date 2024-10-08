import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(private http:HttpClient) { }
  url="http://localhost:3000/api/trips";
  addTrip(formData:Trip):Observable<Trip>{
    return this.http.post<Trip>(this.url,formData)
  }
  getTrips():Observable<Trip[]>{
    return this.http.get<Trip[]>(this.url); 
  }
  getTrip(tripCode:string):Observable<Trip>{
    return this.http.get<Trip>(this.url+"/"+tripCode);
  }
  editTrip(formData:Trip):Observable<Trip>{
    return this.http.put<Trip>(this.url+"/"+formData.code,formData)
  }
}
