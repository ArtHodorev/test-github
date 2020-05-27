import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.github.com/search/repositories';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/vnd.github.mercy-preview+json'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getRepos(q: string) {
    return this.http.get(this.apiUrl + '?q=' + q + '&sort=stars&order=desc', this.httpOptions);
  }
}
