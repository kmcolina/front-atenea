import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  private categoryId = new BehaviorSubject<any>(0);

  getShowCategory():any{
    return this.categoryId;
  }

  setCategoryValues(value:any){
    return this.categoryId.next(value);
  }

}
