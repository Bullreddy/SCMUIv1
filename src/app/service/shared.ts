import { Injectable,EventEmitter ,Output} from '@angular/core';


@Injectable()
export class SharedService {
  //private itemIdValue = new BehaviorSubject<number>(0);
  @Output() itemchanges = new EventEmitter();

  
  constructor() { }

  setItemValue(userid: number) {
    this.itemchanges.emit(userid)
  }

  
}