import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userSource$ = new BehaviorSubject<number>(0);
  
  editText$ = new BehaviorSubject<number>(0);

  constructor() { }


}
