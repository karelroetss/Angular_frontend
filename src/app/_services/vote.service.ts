import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Stem } from '../_models/stem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addVote(vote: Stem){
    return this.http.post<Stem>(this.baseUrl + "Stem", vote);
  }

  getVoteWhereUserId(id: number, listId: number): Observable<Stem>{
    return this.http.get<Stem>(this.baseUrl + "Stem/getWhereUserId?" + "id=" + id + "&listId=" + listId);
  }

  putVote(id: number, vote: Stem): Observable<Stem>{
    return this.http.put<Stem>(this.baseUrl +"Stem/" + id, vote);
  }
}
