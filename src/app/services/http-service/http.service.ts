import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api"
  private queryParams = new HttpParams().set("access_token", localStorage.getItem('accessToken') || "")

  constructor(private http: HttpClient) { }

  async loginSignupCall(endpoint: string, data: any): Promise<any> {
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

  async addNoteCall(endpoint: string, data: any): Promise<any> {
    const headers = new HttpHeaders({
      'Accept': "application/json",
      Authorization: localStorage.getItem('accessToken') || ""
    })
    try {
      const res = await this.http.post(this.baseUrl+endpoint+`?${this.queryParams.toString()}`, data, {headers}).toPromise()
      console.log(res)
      return res
    } catch (err) {
      return err
    }
  }

  getAllNotesCall(endpoint: string): Observable<any> {
    return this.http.get(this.baseUrl+endpoint+`?${this.queryParams.toString()}`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
