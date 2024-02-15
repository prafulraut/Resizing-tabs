import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  editText$ = new BehaviorSubject<number>(0);

  constructor() {}
}
