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
  private authHeader = new HttpHeaders({
    'Accept': "application/json",
    Authorization: localStorage.getItem('accessToken') || ""
  })
  getNoteQueryParams: any;

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
    try {
      const res = await this.http.post(this.baseUrl+endpoint+`?${this.queryParams.toString()}`, data, {headers: this.authHeader}).toPromise()
      console.log(res)
      return res
    } catch (err) {
      return err
    }
  }

  getNotesCall(endpoint: string): Observable<any> {
    this.getNoteQueryParams = new HttpParams().set("access_token", localStorage.getItem('accessToken') || "")
    return this.http.get(this.baseUrl+endpoint+`?${this.getNoteQueryParams.toString()}`, {headers: this.authHeader}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  async archiveNoteCall(endpoint: string, data: Object): Promise<any> {
    try{
      return await this.http.post(this.baseUrl+endpoint+`?${this.queryParams.toString()}`, data, {headers: this.authHeader}).toPromise()
    } catch (err) {
      return err
    }
  }

  async trashNoteCall(endpoint: string, data: Object): Promise<any> {
    try {
      return await this.http.post(this.baseUrl+endpoint+`?${this.queryParams.toString()}`, data, {headers: this.authHeader}).toPromise()
    } catch (err) {
      return err
    }
  }

  async deleteNoteCall(endpoint: string, data: Object): Promise<any> {
    try {
      return await this.http.post(this.baseUrl+endpoint+`?${this.queryParams.toString()}`, data, {headers: this.authHeader}).toPromise()
    } catch (error) {
      return error
    }
  }

  async editNoteCall(endpoint: string, data: Object): Promise<any> {
    try {
      return await this.http.post(this.baseUrl+endpoint+`?${this.queryParams.toString()}`, data, {headers: this.authHeader}).toPromise()
    } catch (error) {
      return error
    }
  }

  async colorChangeCall(endpoint: string, data: Object): Promise<any> {
    try {
      return await this.http.post(this.baseUrl+endpoint+`?${this.queryParams.toString()}`, data, {headers: this.authHeader}).toPromise()
    } catch (error) {
      return error
    }
  }
}
