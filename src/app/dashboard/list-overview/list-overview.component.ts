import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/_services/list.service';
import { Lijst } from 'src/app/_models/lijst.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-list-overview',
  templateUrl: './list-overview.component.html',
  styleUrls: ['./list-overview.component.scss']
})
export class ListOverviewComponent implements OnInit {

  page = 1;
  pageSize = 6;
  lists: Lijst[] = [];
  listShow: Lijst[] = [];
  today = new Date();
  listActive: Lijst[] = [];
  data: Lijst[];
  
  searchForm = this.fb.group({
    string: new FormControl('')
  });

  constructor(
    private _listService: ListService,
    private fb: FormBuilder,
    private _location: Location
    ) { }

  ngOnInit() {
    this.getAllLists();
  }

  onSubmitSearch(){
    let string = this.searchForm.value.string;
    string = string.toLowerCase().trim();
    if (string != ""){
      let listSearch: Lijst[] = [];
      this.lists.forEach(item => {
      if(item.naam.includes(string) || item.beschrijving.includes(string)){
        listSearch.push(item);
      }
      this.listShow = listSearch;
      });
    } else {
      this.listShow = this.lists;
    }
    
  }

  getAllLists(){
    this._listService.getAll().subscribe(result => {
      this.data = result;
      this.data.forEach(item => {
        if(this.checkDateActive(item.eindDatum) == true){
          this.listActive.push(item);
          this.lists.push(item);
        }
      });
      this.data.forEach(item => {
        if(this.checkDateActive(item.eindDatum) == false){
          this.lists.push(item);
        }
      });

      this.listShow = this.lists;
    });    
  }

  goBack(){
    this._location.back();
  }

  checkDateActive(date){
    var today = new Date();
    var dateCheck:Date = new Date(date);

    if(today < dateCheck){
      return true;
    }
    return false;
  }

  showActive(){
    this.listShow = this.listActive;
  }

  showAll(){
    this.listShow = this.lists;
  }
}
