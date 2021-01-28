import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TitlePage } from './title.page';

describe('TitlePage', () => {
  let component: TitlePage;
  let fixture: ComponentFixture<TitlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TitlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
