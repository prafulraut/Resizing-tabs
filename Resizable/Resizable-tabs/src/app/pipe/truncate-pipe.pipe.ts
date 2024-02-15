import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe',
})
export class TruncatePipePipe implements PipeTransform {
  transform(value: string, maxLength: number = 6): string {
    if (value?.length > maxLength) {
      return value.substring(0, maxLength - 3) + '...';
    }
    return value;
  }
}
