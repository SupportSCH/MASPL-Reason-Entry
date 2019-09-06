import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppService } from '../app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  IdleTime: any = {
    start_time: "",
    end_time: "",
    new_start_time: "",
    new_end_time: ""
  };

  date: any;

  constructor(public spinner: NgxSpinnerService, public service: AppService, public dailogRef: MatDialogRef<EditComponent>) { 
    this.IdleTime.start_time = this.service.fullDateToTimeConversion(this.service.ActiveIdleAndReason.start_time);
    this.IdleTime.end_time = this.service.fullDateToTimeConversion(this.service.ActiveIdleAndReason.end_time);
    this.IdleTime.new_start_time = this.IdleTime.end_time;
    this.IdleTime.new_end_time = this.service.fullDateToTimeConversion(this.service.ActiveIdleAndReason.end_time);
    this.date = this.service.fullDateToDateConversion(this.service.ActiveIdleAndReason.start_time);
  }

  ngOnInit() {

  }

  onCancel(): void {
    this.dailogRef.close();
  }

  // For Editing the Idle Reason Time
  editIdleTime() {
    this.spinner.show();
    this.IdleTime.start_time = this.date + ' ' + this.IdleTime.start_time;
    this.IdleTime.end_time = this.date + ' ' + this.IdleTime.end_time;
    this.IdleTime.new_start_time = this.IdleTime.end_time;
    this.IdleTime.new_end_time =  this.date + ' ' + this.IdleTime.new_end_time;

    this.service.editReason(this.IdleTime)
    .subscribe(response => {
      this.fetchIdleTime();
      this.spinner.hide();
    })
  }

  // For fetching the Idle Times from the REST API
  fetchIdleTime() {
    this.spinner.show();
    this.service.fetchIdleTimes()
    .subscribe(response => {
      this.service.IdleTime = response;
      this.service.IdleTime = this.service.IdleTime.data;
      this.onCancel();
      this.spinner.hide();
    })
  }


}
