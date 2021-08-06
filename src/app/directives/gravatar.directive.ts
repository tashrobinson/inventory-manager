import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Directive({
  selector: '[appGravatar]'
})
export class GravatarDirective implements OnInit {

  @Input()
  set email(value: string) {
    console.log(`gravatar input ${value}`);
    this.updateGravatar(value);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {

  }

  updateGravatar(email: string): void {
    console.log(`updateGravatar ${email} ${this.el.nativeElement}`)

    if (!email || !this.el.nativeElement) {
      return;
    }

    const emailHash = Md5.hashStr(email.trim().toLowerCase());
    console.log(`updateGravatar ${emailHash}`)
    this.renderer.setAttribute(this.el.nativeElement, 'src', `//www.gravatar.com/avatar/${emailHash}?d=identicon`);
    console.log(`updateGravatar complete`)
  }
}
