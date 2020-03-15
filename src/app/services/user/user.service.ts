import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface loginData {
    email: string;
    password: string;
}

interface user {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt?: string,
    status?: boolean,
    _id?: string,
}

interface userResponse {
    user: user,
    token: string,
    auth: boolean;
    error: string,
}

@Injectable({
    providedIn: 'root',
})

export class UserService {
    constructor(private http: HttpClient) { }

    private readonly API_URL = environment.API_URL;

    doLogin(userData: loginData): Observable<userResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
            }),
        };

        const endpoint: string = `${this.API_URL}/user/login`;

        return <Observable<userResponse>>this.http
            .post(endpoint, {
                user: userData
            }, httpOptions)
            .pipe(take(1));
    }

    doRegister(userData: user): Observable<userResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
            }),
        };
        const endpoint: string = `${this.API_URL}/user/register`;

        return <Observable<userResponse>>this.http.post(endpoint, {
            user: userData
        }, httpOptions);
    };
}
