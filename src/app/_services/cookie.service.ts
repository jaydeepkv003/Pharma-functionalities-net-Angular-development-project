import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() { }

  getCookie(name: string): Promise<string> {
    return new Promise<string>((resolve) => {
      const cookieList: Array<string> = document.cookie.split(';');
      const cookieName = `${name}=`;

      if (cookieList && cookieList.length) {
        cookieList.forEach((cookie) => {
          const data: string = cookie.replace(/^\s+/g, '');
          if (data.indexOf(cookieName) === 0) {
            resolve(data.substring(cookieName.length, data.length));
          }
        });
      }

      resolve('');
    });
  }

  setCookie(name: string, value: string, expireDays: number, path: string = '/') {
    const date: Date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const cpath = `path=${path}`;
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  deleteAllCookies() {
    const cookieList: Array<string> = document.cookie.split(';');
    cookieList.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
  }

}
