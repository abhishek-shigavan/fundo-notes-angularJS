import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpService: HttpService) { }

  async login(credentials: { email: string; password: string }): Promise<any> {
    try {
      return this.httpService.loginSignupCall("/user/login", credentials)
    } catch (error) {
      return error
    }
  /*  
    this.httpService.loginCall("/user/login",credentials).subscribe(
        (response) => {
          return response
        },
        (error) => {
          return error
        }
      );*/
  }

  async signup(data: {}): Promise<any> {
    try {
      return this.httpService.loginSignupCall("/user/userSignUp", data)
    } catch (error) {
      return error
    }
  }
}
