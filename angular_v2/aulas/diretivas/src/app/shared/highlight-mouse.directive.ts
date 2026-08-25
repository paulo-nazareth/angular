import { Directive, HostListener, HostBinding, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver(){
    // this._renderer.setElementStyle(
    //   this._elementRef.nativeElement
    //   , 'background-color'
    //   , 'yellow'
    // );
    this.backgroundColor='yellow';
  }

  @HostListener('mouseleave') onMouseLeave(){
    // this._renderer.setElementStyle(
    //   this._elementRef.nativeElement
    //   , 'background-color'
    //   , 'white'
    // );
    this.backgroundColor='white';
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = 'white';
  /* Se precisar realizar alguma manipulação antes...
  @HostBinding('style.backgroundColor') get setColor(){
    return this.backgroundColor
  }
  private backgroundColor: string='white';
  */


  constructor(
    private _elementRef: ElementRef, 
    private _renderer: Renderer
  ) { }

}
