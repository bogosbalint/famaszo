import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async set(key: string, value: string) {
    await localStorage?.setItem(key, value);
  }

  async get<T = any>(key: string): Promise<T | string> {
    return (await localStorage.getItem(key)) ?? '';
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
