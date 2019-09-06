import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private dialog: MatDialog,private spinner: NgxSpinnerService, private service: AppService,private breakpointObserver: BreakpointObserver) {
    this.fetchIdleTime();
  }

  // For fetching the Idle Times from the REST API
  fetchIdleTime() {
    this.spinner.show();
    this.service.fetchIdleTimes()
    .subscribe(response => {
      this.service.IdleTime = response;
      this.service.IdleTime = this.service.IdleTime.data;
      this.fetchIdleReason(this.service.IdleTime[0].idle_code);
      this.spinner.hide();
    })
  }

  // For Active the particular Item
  activeThisItem(idleTimeCode) {
    this.service.ActiveIdleTime = idleTimeCode;
    console.log(this.service.ActiveIdleTime);
  }

  // For Fetching the Particular Idle Reasons
  fetchIdleReason(idleTimeCode) {
    this.activeThisItem(idleTimeCode);
    this.spinner.show();
    this.service.fetchIdleReason()
    .subscribe(response => {
      this.service.ActiveReasonCard = response;
      this.service.ActiveIdleAndReason = this.service.ActiveReasonCard.data;
      this.service.ActiveReasonCardDescription = this.service.ActiveReasonCard.data.join.reason_code_desc;
      this.service.ActiveReasonCard = this.service.ActiveReasonCard.data.reason_code;
      this.spinner.hide();
    })
  }

  // To Open the Filter Dialog
  onFilterDialog() {
    const dialog = this.dialog.open(FilterComponent, {
      width: '400px',
    })
  }

  // For Refreshing the Data.
  refresh() {
    this.fetchIdleTime();
  }

}
