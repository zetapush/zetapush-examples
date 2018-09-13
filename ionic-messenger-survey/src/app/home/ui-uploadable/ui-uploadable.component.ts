import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

const DEFAULT_BASE64_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

@Component({
  selector: 'app-ui-uploadable',
  template: `
    <form #form name="app-ui-uploadable-form">
      <input [attr.id]="id" type="file" name="file" (change)="onChange($event)" [attr.accept]="accept" [attr.multiple]="multiple" />
      <label [attr.for]="id">
        <img [src]="src"/>
      </label>
    </form>
  `,
  styles: [
    `
    :host {

    }
    form {
      display: flex;
      height: 100%;
      width: 100%;
    }
    img{
      object-fit: contain;
      min-width: 100px;
      max-height: 50vh;
      min-height: 100px;
      max-width: 75vw;
      margin: auto;
    }
    label[for] {
      cursor: pointer;
    }
    [name="file"] {
      display: block;
      overflow: hidden;
      appearance: none;
      width: 0;
      height: 0;
    }
  `,
  ],
})
export class UiUploadableComponent implements OnChanges {
  protected static id = 0;
  id: string;
  @Input() accept = 'image/*';
  @Input() multiple = true;
  @Input() src = DEFAULT_BASE64_SRC;
  @Output() files = new EventEmitter<any>();
  @ViewChild('form') form: ElementRef;
  constructor() {
    this.id = `zp-ui-uploadable--${++UiUploadableComponent.id}`;
  }
  onChange($event) {
    const { files } = $event.target;
    this.files.emit(Array.from(files));
    this.form.nativeElement.reset();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.src.currentValue) {
      this.src = changes.src.currentValue;
    } else {
      this.src = DEFAULT_BASE64_SRC;
    }
  }
}
