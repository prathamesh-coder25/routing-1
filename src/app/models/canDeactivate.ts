import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

export interface ICanDeactivate {

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>;

}