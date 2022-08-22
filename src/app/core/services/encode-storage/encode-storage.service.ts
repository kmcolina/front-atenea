import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
// @ts-ignore
const SecureStorage = require('secure-web-storage');

const SECRET_KEY = 'Ber1g0';
const _sessionStorage: any = {
  /**
  * Setea el item correspondiente a la key ingresada
  * @param key:any
  * @param value:any
  */
  setItem: function setItem(key:any, value: any) {
    sessionStorage.setItem(key, value);
  },

  /**
  * obtiene el item correspondiente a la key ingresada
  * Valida si el item de la key ingresada es string y luego retorna
  * @param key:any
  * @returns _obj o null si es vacio
  */
  getItem: function getItem<T>(key: string) : T | string | null {
    let _obj  = sessionStorage.getItem(key);
    if (_obj !== null && _obj !== ''){
      if (typeof _obj === 'string') {
        return _obj;
      } else {
        return <T> JSON.parse(_obj);
      }
    }else {
      return null;
    }
  },

  /**
  * Elimina el item correspondiente a la key ingresada
  * @param key:any
  */
  removeItem: function removeItem(key:any) {
    sessionStorage.removeItem(key);
  },

  /**
  * Detecta el valor ingresado
  * @param k:any
  */
  key: function key(k: any) {
    sessionStorage.key(k);
  },

  /**
  * Limpia los items
  */
  clear: function clear() {
    // This is intentional
  }

};

/**
** Servicios de encode storage
*/
@Injectable({
  providedIn: 'root'
})

export class EncodeStorageService {
  /**
  ** Servicios encriptar desencriptar y hash con sessionStorage
  */
  public secureStorage = new SecureStorage(_sessionStorage, {

    hash: function hash(key:any) {
      key = CryptoJS.HmacSHA256(key, SECRET_KEY).toString(CryptoJS.enc.Hex);
      return key.toString();
    },
    encrypt: function encrypt(data:any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
    decrypt: function decrypt(data:any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    }
  });
}
