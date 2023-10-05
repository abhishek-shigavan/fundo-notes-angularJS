import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { shareReplay } from 'rxjs';

interface LoginResponse {
  id?: string,
  firstName?: string,
  lastName?: string,
  email?: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpService: HttpService) { }

  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    try {
      const res: LoginResponse = await this.httpService.loginSignupCall("/user/login", credentials) || {}
      localStorage.setItem("accessToken", res?.id || "")
      localStorage.setItem("userName", `${res?.firstName} ${res?.lastName}` || "" )
      localStorage.setItem("userEmail", res?.email || "")
      return res
    } catch (error) {
      return error || {}
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
