import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListService } from 'src/app/_services/list.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { ItemService } from 'src/app/_services/item.service';
import { VoteService } from 'src/app/_services/vote.service';
import { Stem } from 'src/app/_models/stem.model';
import { UserService } from 'src/app/_services/user.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-list-vote',
  templateUrl: './list-vote.component.html',
  styleUrls: ['./list-vote.component.scss']
})
export class ListVoteComponent implements OnInit {

  listId;
  list: any;
  userID;
  voted = false;
  votemsg;
  itemIdVoted;
  voteId;
  inactive;
  state;

  voteForm = this.fb.group({
    vote: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _listService: ListService,
    private fb: FormBuilder,
    private _itemService: ItemService,
    private _voteService: VoteService,
    private _userService: UserService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.inactive = 0;
    this.userID = Number(localStorage.getItem("userID"));

    this.route.paramMap.subscribe(params => {
      this.listId = params.get('id');
    })

    this._listService.getListWhereId(this.listId).subscribe(result => {
      this.list = result;

      if (this.checkDateActive(this.list.eindDatum, this.list.startDatum) != true) {
        this.state = this.checkDateActive(this.list.eindDatum, this.list.startDatum);
        this.inactive = 1;
      }

      this._voteService.getVoteWhereUserId(this.userID, this.listId).subscribe(result => {
        if (result.stemID != 0) {
          this.voted = true;
          this.voteForm.controls["vote"].setValue(result.itemID);
          this.itemIdVoted = result.itemID;
          this.voteId = result.stemID;
        }
      })
    })
  }

  onSubmitVote() {
    if (this._userService.isLoggedIn() == false) {
      this.router.navigate(['/login']);
      this.voted = true;
    }

    let itemId: number = Number(this.voteForm.value.vote);
    if (itemId == this.itemIdVoted) {
      this.votemsg = "Already voted for this item."
    } else {
      let vote = new Stem(0, itemId, Number(localStorage.getItem("userID")));
      if (this.voted == false) {
        this._voteService.addVote(vote).subscribe();
        this.votemsg = "Your vote has been submitted.";
        this.itemIdVoted = itemId;
      } else {
        vote["stemID"] = this.voteId;
        this._voteService.putVote(this.voteId, vote).subscribe(
          result => {
            this.votemsg = "Vote has been updated.";
            this.itemIdVoted = itemId;
          }
        );
      }
    }
  }

  checkDateActive(date, date1) {
    var today = new Date();
    var dateEnd: Date = new Date(date);
    var dateStart: Date = new Date(date1);

    if (today < dateEnd && today > dateStart) {
      return true;
    } else {
      if (today > dateEnd) {
        return "ended";
      }
      if (today < dateStart) {
        return "coming";
      }
    }

    return false;
  }

  goBack() {
    this._location.back();
  }
}
