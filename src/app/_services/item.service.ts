import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Item } from '../_models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addItem(item: Item){
    return this.http.post<Item>(this.baseUrl + "Item", item);
  }

  delItem(id: number){
    return this.http.delete<Item>(this.baseUrl + "Item/" + id);
  }
}
