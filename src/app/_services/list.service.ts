import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Lijst } from '../_models/lijst.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getListFromGebruiker(id: number): Observable<Lijst[]>{
    return this.http.get<Lijst[]>(this.baseUrl + "Lijst/getWhereUser/" + id);
  }

  addList(list: Lijst){
    return this.http.post<Lijst>(this.baseUrl + "Lijst", list);
  }

  getListWhereId(id: number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "Lijst/" + id);
  }

  getAll(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "Lijst");
  }

  getWhereUserVoted(id: number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "Lijst/getWhereUserVoted/" + id);
  }
}
