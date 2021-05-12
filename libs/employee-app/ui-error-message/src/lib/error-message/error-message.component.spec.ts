import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error.message.component';

describe('ErrorMessage component', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent]
    }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display input component property', () => {
    const errorMessage = 'Hi there!';
    component.message = errorMessage;
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toEqual(errorMessage);
  });
});