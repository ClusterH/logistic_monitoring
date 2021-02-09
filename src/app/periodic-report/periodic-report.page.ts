import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-periodic-report',
  templateUrl: './periodic-report.page.html',
  styleUrls: ['./periodic-report.page.scss'],
})
export class PeriodicReportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // moveField(event, index): void {
  //   let value = event.target.value;
  //   if (value >= 10) {
  //     event.preventDefault()
  //     this.registerForm.get('code_' + index).setValue(value.slice(0, 1), { emitEvent: false });
  //   }
  //   if (index < 5 && value.match(new RegExp(/^\d+$/)) != null) {
  //     event.target.nextSibling.focus();
  //   }
  // }


}
