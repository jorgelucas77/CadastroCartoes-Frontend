import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {
  private myAppUrl = 'https://localhost:44397/';
  private myApiUrl = 'api/cartao/';

  constructor( private http: HttpClient) { }

  getlistarCartoes(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteCartao(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveCartao(cartao: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, cartao);
  }

  updateCartao(id: number, cartao: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, cartao);
  }
}
