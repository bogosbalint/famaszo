import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { StorageService } from './storage.service.service';
import { IUser } from '../interfaces/user.interface';
import { IToken } from '../interfaces/token.interface';

const TOKEN_KEY = "token"
const USER_OBJECT_KEY = "userObject"

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _user?: IUser
  private _token?: IToken

  get user(): IUser {
    return this.user
  }

  get token(): IToken | null {
    return this._token ?? null
  }

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService
  ) { }

  async init() {
    const token = await this.storage.get<IToken>(TOKEN_KEY)
    if(!token) return

    const user = await this.storage.get<IUser>(USER_OBJECT_KEY)

    //if()

  }
}
