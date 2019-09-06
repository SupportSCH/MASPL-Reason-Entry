import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppService } from '../app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(public spinner: NgxSpinnerService, public service: AppService, public dailogRef: MatDialogRef<FilterComponent>) {

  }

  ngOnInit() {
  }

  // For Start Date
  onfdateChangeEvent(e): void {
    let days =1;
    this.service.filter.fdate = this.service.fullDateStringToDateConversion(new Date(new Date(e.target.value).setDate(new Date(e.target.value).getDate() + days)).toISOString());
  }

  // For End Date
  onedateChangeEvent(e): void {
    let days =1;
    this.service.filter.edate = this.service.fullDateStringToDateConversion(new Date(new Date(e.target.value).setDate(new Date(e.target.value).getDate() + days)).toISOString());
  }

  // For Filtering the Date
  DateFilter() {
    this.spinner.show();
    this.service.dateFilter()
    .subscribe(response => {
      this.service.IdleTime = response;
      this.service.IdleTime = this.service.IdleTime.data;
      this.onCancel();
      this.spinner.hide();
    })
  }

  // For Cancelling the Filter
  onCancel() {
    this.dailogRef.close();
  }



}
