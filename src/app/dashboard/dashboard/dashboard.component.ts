import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/_services/list.service';
import { Lijst } from 'src/app/_models/lijst.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, Location } from '@angular/common';
import { VoteService } from 'src/app/_services/vote.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  lijsten: Lijst[];
  votedlists: Lijst[];
  showVoted = 0;
  today = new Date();

  listForm = this.fb.group({
    naam: new FormControl('', Validators.required),
    beschrijving: new FormControl('', Validators.required),
    startDatum: new FormControl(this.datePipe.transform(this.today, 'yyyy-MM-dd'), Validators.required),
    eindDatum: new FormControl('', Validators.required)
  });

  constructor(
    private _listService: ListService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private _location: Location,
  ) { }

  ngOnInit() {
    this.showVoted = 0;
    let userID = Number(localStorage.getItem("userID"));
    this._listService.getListFromGebruiker(userID).subscribe(
      result => {
        this.lijsten = result;
      }
    );
  }

  showVotedLists(){
    this.showVoted = 1;
    let userID = Number(localStorage.getItem("userID"));
    this._listService.getWhereUserVoted(userID).subscribe(
      result => {
        this.votedlists = result;
      }
    );
  }

  showDashboard(){
    this.showVoted = 0;
  }

  openModalList(content){
    this.modalService.open(content, { ariaLabelledBy: 'modal-list-title'});
  }

  onSubmitListForm(){
    let name = this.listForm.value.naam;
    let desc = this.listForm.value.beschrijving;
    let startDatum = this.listForm.value.startDatum;
    let eindDatum = this.listForm.value.eindDatum;
    let userID = Number(localStorage.getItem("userID"));
    let list = new Lijst(0, name, desc, startDatum, eindDatum, userID);
    this._listService.addList(list).subscribe(result => {
      this.lijsten.push(result);
    });
  }

  onModalListClose(){
    this.listForm.reset();
    this.listForm.controls['startDatum'].setValue(this.datePipe.transform(this.today, 'yyyy-MM-dd'));
  }

  checkDateActive(date, date1){
    var today = new Date();
    var dateEnd:Date = new Date(date);
    var dateStart:Date = new Date(date1);

    if(today < dateEnd && today > dateStart){
      return true;
    } else{
      if(today > dateEnd){
        return "ended";
      }
      if(today < dateStart){
        return "coming";
      }
    }

    return false;
  }

  goBack(){
    this._location.back();
  }
}
