import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-link',
  template: `
    <a class="icon-link">
      <span class="link-button__container">
        <mat-icon>{{icon}}</mat-icon>
        <span class="link-button__content">
          <ng-content></ng-content>
        </span>
      </span>
    </a>
  `,
  styles: [
    '.icon-link { cursor: pointer; text-decoration: underline }',
    '.icon-link:hover { font-weight: bold; }',
    '.link-button__container { display: flex; }',
    '.link-button__content { padding: 3px 0 0 4px; }',
  ]
})
export class IconLinkComponent {
  @Input() icon!: string;
}
