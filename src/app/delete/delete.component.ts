import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(public spinner: NgxSpinnerService,public service: AppService,public dailogRef: MatDialogRef<DeleteComponent>) { }

  ngOnInit() {
  }

  onCancel(): void {
    this.dailogRef.close();
  }

  // For Deleting the Reason from the Idle Time
  deleteReason() {
    this.spinner.show();
    this.service.deleteReason()
    .subscribe(response => {
      console.log(response);
      this.fetchIdleTime();
      this.spinner.hide();
      this.dailogRef.close();
    })
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

}
