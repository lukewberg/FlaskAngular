import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common//http';
import { ResponseObject } from './response';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor( private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<ResponseObject>('http://localhost:5000/login', JSON.stringify({
      email: email,
      password: password
    }), {
      headers:{
        'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    })
  }

  account(){
    return this.httpClient.get<ResponseObject>('http://localhost:5000/account');
  }

  register(email: string, password: string, username: string){
    return this.httpClient.post<ResponseObject>('http://localhost:5000/register', JSON.stringify({
      email: email,
      password: password,
      username: username
    }), {
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  logout(){
    return this.httpClient.get<ResponseObject>('http://localhost:5000/logout');
  }
}
