import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const arq of value) {
      if (arq.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(arq);
      };
    };
    return resultPosts;
  }

}
