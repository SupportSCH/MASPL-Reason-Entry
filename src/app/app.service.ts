import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public IdleTime: any = []; // For Idle Times
  public Reasons: any = []; // For Reasons

  public ActiveReasonCard: any;
  public ActiveReasonCardDescription: any;

  public ActiveIdleTime: any;

  public ActiveIdleAndReason: any = [];

  public filter: any = {
    fdate: '',
    edate: ''
  };

  public baseURL = 'http://172.16.16.27/maspl/public/api/';

  constructor(public http: HttpClient) { }

  // For Full Date to Short Date Conversion
  fullDateToDateConversion(fullDate) {
    let FullDate = fullDate.split(' ');
    return FullDate[0];
  }

  // For Full Date to Short Date Conversion
  fullDateStringToDateConversion(fullDate) {
    let FullDate = fullDate.split('T');
    return FullDate[0];
  }

  // For Full Date to Time Conversion
  fullDateToTimeConversion(fullDate) {
    let FullDate = fullDate.split(' ');
    return FullDate[1];
  }

  // For Calculating the Time Difference between the Start Time and End Time
  timeDifferenceCalculation(startTime, endTime) {
    let STime: any = new Date(startTime);
    let ETime: any = new Date(endTime);
    let IdleTime: any = (ETime - STime);
    return this.milliSecondsToMinutes(IdleTime);
  }

  // For Converting the Milli Seconds To Minutes
  milliSecondsToMinutes(millis: number) {
    let str = "";

    let minutes = Math.floor(millis / 60000);
    let second = ((millis % 60000) / 1000);

    if (minutes > 1) {
      str = minutes + " mins";
    }
    else if (minutes > 0) {
      str = minutes + " min";
    }

    if (second > 1) {
      str = str + " : " + second + " secs";
    }
    else if (second > 0) {
      str = str + " : " + second + " sec";
    }

    return str;
  }

  // For Fetching the Idle Reasons
  fetchReasons() {
    return this.http.get(this.baseURL + 'reasonapi');
  }

  // For Fetching the Idle Times
  fetchIdleTimes() {
    return this.http.get(this.baseURL + 'treasonapi');
  }

  // For Fetching the particular Idle Reason
  fetchIdleReason() {
    return this.http.get(this.baseURL + 'treasonapi/' + this.ActiveIdleTime);
  }

  //For Set the Reason to the Idle Time
  putReasonToIdleTime() {

    const headerDict = {
      'Content-Type': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    let body: any = {
      "reason_code": this.ActiveReasonCard,
      "reason_code_desc": this.ActiveReasonCardDescription
    }

    return this.http.put(this.baseURL + 'treasonapi/' + this.ActiveIdleTime, body, requestOptions);
  }

  // For Editing the Reason for the Idle time
  editReason(EditedIdleTime) {
    const headerDict = {
      'Content-Type': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.put(this.baseURL + 'EndTimeUpdate/' + this.ActiveIdleTime, EditedIdleTime, requestOptions);
  }

  // For Delete the Reason for the Idle Time
  deleteReason() {
    const headerDict = {
      'Content-Type': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.put(this.baseURL + 'DeleteReasonApi/' + this.ActiveIdleTime, requestOptions);
  }

  // For Filtering the date of the Idle time.
  dateFilter() {

    let data = {
      "token": "plant_oee",
      "curr_date": "2019-01-02",
      "curr_time": "10:00:00"
    }

    const headerDict = {
      'Content-Type': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(this.baseURL + 'searchDate/1', data, requestOptions);
  }

}
