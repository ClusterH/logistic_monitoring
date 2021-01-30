import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewRoutePage } from './new-route.page';

describe('NewRoutePage', () => {
  let component: NewRoutePage;
  let fixture: ComponentFixture<NewRoutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoutePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
