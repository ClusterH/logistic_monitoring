import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnroutePage } from './onroute.page';

describe('OnroutePage', () => {
  let component: OnroutePage;
  let fixture: ComponentFixture<OnroutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnroutePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnroutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
