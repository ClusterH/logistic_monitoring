import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HazardReportPage } from './hazard-report.page';

describe('HazardReportPage', () => {
  let component: HazardReportPage;
  let fixture: ComponentFixture<HazardReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HazardReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
