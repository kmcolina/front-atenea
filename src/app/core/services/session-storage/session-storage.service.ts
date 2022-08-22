import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { EncodeStorageService } from "../encode-storage/encode-storage.service";

/**
** Servicio de sesion storage
*/
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService{

  isBrowser:boolean = false;

  constructor(
    private storageService: EncodeStorageService,
    @Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

  /**
  ** Guarda dato Json
  * @param key: string
  * @param value: any
  */
    setJsonValue(key: string, value: any) {
      if (this.isBrowser){
        this.storageService.secureStorage.setItem(key, value);
      }
    }

    /**
    ** Obtiene dato Json
    * @param key: string
    * @returns dato
    */
    getJsonValue(key: string) {
      if (this.isBrowser) {
        return this.storageService.secureStorage.getItem(key);
      }
    }

    /**
    ** Elimina dato Json
    * @param id:string
    */
    removeItemJson(id:string) {
      if (this.isBrowser) {
        //this.removeItem(this.storageService.secureStorage.key(id))
        this.storageService.secureStorage.setItem(id, null);
      }
    }

    /**
    ** Limpia el token de storage
    */
    clearToken() {
      if (this.isBrowser)
        return this.storageService.secureStorage.clear();
    }


  /**
  ** Setea dato de session storage
  * @param key: string
  * @param value: any
  */
  public setItem(key: string, value: any): void {
    if (this.isBrowser) {
      sessionStorage.setItem(key,value);
    }
  }

  /**
  * Obtiene dato de session storage
  * Valida si es string (sino lo convierte) y lo retorna
  * @param key: string
  * @returns dato o null si es vacio
  */
  public getItem<T>(key: string) : T | string | null{
    if (this.isBrowser) {
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
    }
    return null;
  }

  /**
  ** Elimina dato de session storage
  * @param key: string
  */
  public removeItem(key: string): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(key);
    }
  }

  /**
  * Limpia el sesionStorage
  */
  clearItems() {
    if (this.isBrowser)
      sessionStorage.clear();
  }


}
