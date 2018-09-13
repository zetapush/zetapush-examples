import {
  Directive,
  ElementRef,
  OnInit,
  AfterContentInit,
  OnDestroy,
  HostListener,
} from '@angular/core';

import { Subject } from 'rxjs';


@Directive({
  selector: '[appScrollGlue]'
})
export class ScrollGlueDirective implements AfterContentInit, OnDestroy {
  public el: any;
  private _observer: any;
  private observerConfig = {
    attributes: false,
    childList: true,
    characterData: false,
  };

  constructor(private _el: ElementRef) {
    console.log(ScrollGlueDirective.name, _el);
    this.el = _el.nativeElement;
  }

  ngAfterContentInit() {
    setTimeout(() => this.el.parentElement.scrollToBottom(), (1000 / 60) * 10);
    // create an observer instance
    this._observer = new MutationObserver((mutations) => {
      setTimeout(() => this.el.parentElement.scrollToBottom(), (1000 / 60));
    });
    const target = this.el;
    // pass in the target node, as well as the observer options
    this._observer.observe(target, this.observerConfig);
  }

  ngOnDestroy() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }
}
