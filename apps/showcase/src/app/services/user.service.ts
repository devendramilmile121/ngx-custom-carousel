import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedUser } from '../types/paginated-user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {}

    get(
        limit: number = 5,
        skip: number = 10,
        keys: string = 'firstName,age,lastName,email,image,company'
    ): Observable<PaginatedUser> {
        return this.http.get<PaginatedUser>(
            `https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=${keys}`
        );
    }
}
