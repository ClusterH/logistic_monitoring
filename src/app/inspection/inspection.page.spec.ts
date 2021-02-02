import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspectionPage } from './inspection.page';

describe('InspectionPage', () => {
  let component: InspectionPage;
  let fixture: ComponentFixture<InspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
