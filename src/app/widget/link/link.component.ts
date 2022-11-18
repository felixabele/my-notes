import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Link } from '../widget';

@Component({
  selector: 'app-link',
  template: `
    <div class="link-widget">
      <div class="link-input">
        <mat-form-field [class.cdk-visually-hidden]="!editing">
          <input
            matInput
            #linkInput="matInput"
            type="text"
            [(ngModel)]="urlModel"
            (blur)="onStopEditing()"
          />
        </mat-form-field>

        <span [hidden]="editing">
          {{ link.title }} {{ link.url }}
          <mat-icon (click)="onStartEditing()">edit</mat-icon>
        </span>
      </div>
      <mat-icon (click)="onDelete()">close</mat-icon>
    </div>
  `,
  styles: [
    '.link-widget { display: flex; justify-content: space-between; }',
  ]
})
export class LinkComponent implements OnInit {
  @Input() link!: Link;
  @Output() deleteLink = new EventEmitter<Link>();
  @Output() updateLink = new EventEmitter<Link>();
  @ViewChild('linkInput') linkInputField: MatInput | undefined;

  editing: boolean = false;
  urlModel: string = '';

  stringifyLink(link: Link): string {
    return link.title ? `${link.title}|${link.url}` : link.url;
  }

  parseLink(linkString: string): Link {
    if (linkString.includes('|http')) {
      const splitLinkString = linkString.split(/(.*)\|(http.*)/);
      return {
        ...this.link, url: splitLinkString[2], title: splitLinkString[1]
      };
    }

    return {
      ...this.link, url: linkString, title: ''
    };
  }

  ngOnInit(): void {
    this.urlModel = this.stringifyLink(this.link);
  }

  onDelete(): void {
    this.deleteLink.emit(this.link);
  }

  onStartEditing(): void {
    this.editing = true;
    this.linkInputField?.focus()
  }

  onStopEditing(): void {
    this.editing = false;
    const unchanged = this.urlModel === this.stringifyLink(this.link);

    if (unchanged) {
      return;
    }

    this.updateLink.emit(this.parseLink(this.urlModel));
    console.log("changed", this.urlModel);
  }
}
