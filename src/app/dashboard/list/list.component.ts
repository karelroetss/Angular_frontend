import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/_services/list.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/_models/item.model';
import { ItemService } from 'src/app/_services/item.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listId;
  list: any;

  itemForm = this.fb.group({
    naam: new FormControl('', Validators.required),
    beschrijving: new FormControl('', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private _listService: ListService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private _itemService: ItemService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listId = params.get('id');
    })
    this._listService.getListWhereId(this.listId).subscribe(result => {
      this.list = result;
    })
  }

  openModalItem(content){
    this.modalService.open(content, { ariaLabelledBy: 'modal-item-title'});
  }

  onSubmitItemForm(){
    let naam = this.itemForm.value.naam;
    let beschrijving = this.itemForm.value.beschrijving;
    let item = new Item(0, this.listId, naam, beschrijving);
    this._itemService.addItem(item).subscribe(
      result => {
        this.list.items.push(result);
      }
    );
    this.itemForm.reset();
  }

  delItem(id: number){
    this._itemService.delItem(id).subscribe(
      result => {
        this.list.items = this.list.items.filter(item => item.itemID !== id);
      }
    );
  }

  onModalItemClose(){
    this.itemForm.reset();
  }

  goBack(){
    this._location.back();
  }
}
