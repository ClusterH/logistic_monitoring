import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PeriodicReportPage } from './periodic-report.page';

describe('PeriodicReportPage', () => {
  let component: PeriodicReportPage;
  let fixture: ComponentFixture<PeriodicReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PeriodicReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
