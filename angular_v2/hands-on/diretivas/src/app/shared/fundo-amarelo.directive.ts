import { Directive, ElementRef, Renderer } from '@angular/core';
/*Para aplicar diretamente a um tipo de tag, é necessário especializar a diretiva, informando a tag html desejada*/
@Directive({
  selector: 'p[fundoAmarelo]'
})
export class FundoAmareloDirective {
  
  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer
  ) { 
    //console.log(this._elementRef);
    //style="background-color: yellow;"
    /*Recomendável evitar devido a vulnerábilidade a ataques de XSS*/
    //this._elementRef.nativeElement.style.backgroundColor='yellow';
    
    this._renderer.setElementStyle(
      this._elementRef.nativeElement,
      'background-color',
      'yellow'
    );
  }

}
