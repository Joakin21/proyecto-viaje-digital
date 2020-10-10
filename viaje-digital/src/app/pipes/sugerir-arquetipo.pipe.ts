import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sugerirArquetipo'
})
export class SugerirArquetipoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return [];
    const resultPosts = [];
    for (const arq of value) {
      if (arq.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(arq);
      };
    };
    return resultPosts;
  }

}
