import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api"

  constructor(private http: HttpClient) { }

  async loginCall(endpoint: string, data: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    try {
      const res = await this.http.post(this.baseUrl + endpoint, data, { headers }).toPromise()
      return res
    } catch (error) {
      return error
    }
  }
}
