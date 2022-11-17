import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExistingNote } from './note';

import { NoteComponent } from './note.component';

const sampleNote: ExistingNote = {
  id: 'test-ID',
  title: 'First sample note',
  description: 'My sample description',
  visible: true,
  widgets: [],
};

fdescribe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    component.note = sampleNote;
    fixture.detectChanges();
  });

  it('should create and render note title', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(sampleNote.title);
  });
});
