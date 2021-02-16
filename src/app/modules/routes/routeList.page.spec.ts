import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouteListPage } from './routeList.page';

describe('HomePage', () => {
  let component: RouteListPage;
  let fixture: ComponentFixture<RouteListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RouteListPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
