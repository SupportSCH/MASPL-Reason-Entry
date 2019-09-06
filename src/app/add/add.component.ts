import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppService } from '../app.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(public spinner: NgxSpinnerService,public service: AppService,public dailogRef: MatDialogRef<AddComponent>) { 

  }

  ngOnInit() {
  }

  onCancel(): void {
    this.dailogRef.close();
  }

  // For fetching the Idle Times from the REST API
  fetchIdleTime() {
    this.spinner.show();
    this.service.fetchIdleTimes()
    .subscribe(response => {
      this.service.IdleTime = response;
      this.service.IdleTime = this.service.IdleTime.data;
      console.log(this.service.IdleTime);
      this.spinner.hide();
    })
  }

  // For Assigning the Reason to the Idle Time
  putReasonToIdleTime() {
    this.spinner.show()
    this.service.putReasonToIdleTime()
    .subscribe(response => {
      let Response: any = response;
      if(Response.status == 1) {
        this.fetchIdleTime();
        this.onCancel();
        this.spinner.hide();
      }
    })
  }

}
