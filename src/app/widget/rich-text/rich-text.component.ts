import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rich-text',
  template: `
    <p>
      rich-text works!
    </p>
  `,
  styles: [
  ]
})
export class RichTextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
