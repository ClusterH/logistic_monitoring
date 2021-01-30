import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckGpsPage } from './check-gps.page';

describe('CheckGpsPage', () => {
  let component: CheckGpsPage;
  let fixture: ComponentFixture<CheckGpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckGpsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckGpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
