import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudOperations } from './CrudOperations';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  constructor(
    protected _http: HttpClient,
    @Inject(String) protected _base: string
  ) { }

  add(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }
  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + id, t, {});
  }
  findOne(id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + id);
  }
  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base)
  }
  delete(id: ID): Observable<any> {
    return this._http.delete<T>(this._base + '/' + id);
  }
}
