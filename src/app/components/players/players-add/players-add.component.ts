import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { PlayersService } from 'src/app/services/players/players.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-players-add',
  templateUrl: './players-add.component.html',
  styleUrls: ['./players-add.component.css']
})
export class PlayersAddComponent implements OnInit {

  playerForm = this.formBuilder.group({
    playerFullName: [null, Validators.required],
    playerCell: [null, Validators.required],
    gender: [null, Validators.required],
    birthDate: [null, Validators.required],
    parentFullName: [null, Validators.required],
    parentCell: [null, Validators.required],
  });

  constructor(
    private playersService: PlayersService,
    private formBuilder: FormBuilder,
  ) { }

  calculateMaxDate(): string {
    const currentYear = moment().year();
    const firstDayOfYear = moment(`${currentYear}-01-01`);
    return firstDayOfYear.subtract(6, 'years').format('YYYY-MM-DD');
  }

  onAddClick() {
    const newBirthDate = moment(this.playerForm.controls.birthDate.value).toDate();
    const newBirtDateTimestamp = firebase.firestore.Timestamp.fromDate(newBirthDate)

    const newPlayer = {
      playerFullName: this.playerForm.controls.playerFullName.value,
      playerCell: this.playerForm.controls.playerCell.value,
      gender: this.playerForm.controls.gender.value,
      // birthDate: this.playerForm.controls.birthDate.value,
      parentFullName: this.playerForm.controls.parentFullName.value,
      parentCell: this.playerForm.controls.parentCell.value,
    } as Player;

    this.playersService.createPlayerToAdd(newPlayer);
    this.playerForm.reset();
  }

  ngOnInit() {

  }

}
