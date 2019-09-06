import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddComponent } from '../add/add.component';
import { MatDialog } from '@angular/material';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.scss']
})
export class ReasonsComponent implements OnInit {

  innerWidth: any;

  constructor(public dialog: MatDialog,private spinner: NgxSpinnerService, private service: AppService) {

  }

  //Startup Method
  ngOnInit() {
    this.fetchReasons();
    this.innerWidth = window.innerWidth;
  }

  // For Fetching the Idle reasons from the REST API
  fetchReasons() {
    this.spinner.show();
    this.service.fetchReasons()
      .subscribe(response => {
        this.service.Reasons = response;
        this.service.Reasons = this.service.Reasons.data;
        this.spinner.hide();
      })
  }

  // Host listener for capturing the window size
  @HostListener('window:size', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }

  // Calculating Gird Columns based on the window size from the Host Listenersss
  calcGridColumns() {
    if (this.innerWidth > 1200 && this.innerWidth <= 1280) {
      return 5;
    } else if (this.innerWidth > 768 && this.innerWidth <= 1200) {
      return 4;
    } else if (this.innerWidth > 500 && this.innerWidth <= 768) {
      return 3;
    } else if (this.innerWidth <= 500) {
      return 2;
    } else {
      return 6;
    }
  }

  // For Active the particular Reason Card
  activeThisCard(reason_code, reason_description) {
    this.service.ActiveReasonCard = reason_code;
    this.service.ActiveReasonCardDescription = reason_description;
  }

  // To make the Fab state Inactive initially
  fabTogglerState = 'active';

  // For Changing the Tab state while clicking so that it can be toggle
  onToggleFab() {
    if (this.fabTogglerState == 'active') {
      this.fabTogglerState = 'inactive'
    } else if (this.fabTogglerState == 'inactive') {
      this.fabTogglerState = 'active'
    }
  }

  // For Add Dialog box for saving the Idle reasons
  openAddDialog() {
    const dialog = this.dialog.open(AddComponent, {
      width: '400px',
    })
  }

  // For Edit Dialog box for Editing the Idle reasons
  openEditDialog() {
    const dialog = this.dialog.open(EditComponent, {
      width: '400px',
    })
  }

  // For Delete Dialog box for Deleting the Idle reasons
  openDeleteDialog() {
    const dialog = this.dialog.open(DeleteComponent, {
      width: '400px',
    })
  }

}
