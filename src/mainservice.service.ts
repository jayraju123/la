import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';

import { Login } from './app/Cart/login/login';


import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  getItemsByTypeId(typeId: string | null): any {
    throw new Error('Method not implemented.');
  }

  rootApiUrl = environment.apiRoot;
  url2 = environment.url2;
  login = environment.loginreq;
  saveTypeUrl = environment.saveTypeUrl;
  menugetUrl = environment.menugetUrl;
  menueditUrl = environment.menueditUrl;
  getabout = environment.getabout;
  updateUrl = environment.updateUrl;
  updateabout = environment.updateabout;
  getTypeNames = environment.getTypeNames;
  menuurl1 = environment.menuurl1;
  menuapiUrl = environment.menuapiUrl;
  editDetailsurl2 = environment.editDetailsurl2;
  editDetailsurl3 = environment.editDetailsurl3;
  saveImageUrl = environment.saveImageUrl;

  Tableurl = environment.Tableurl;
  Tableurl1 = environment.Tableurl1
  TableDeleteUrl = environment;

  viewsaveTypeUrl = environment.viewsaveTypeUrl;
  viewgetUrl = environment.viewgetUrl;
  vieweditUrl = environment.vieweditUrl;
  viewgetabout = environment.viewgetabout;
  viewupdateUrl = environment.viewupdateUrl;
  viewupdateabput = environment.viewupdateabput;
  viewgetTypeNames = environment.viewgetTypeNames;
  viewurl1 = environment.viewapiUrl;
  viewapiUrl = environment.viewapiUrl;



  private typeId!: string;
  private updatedItemId!: string;
  getItem: any;


  private viewtypeId!: string;
  private viewupdatedItemId!: string;
  viewgetItem: any;



  private businessIdSource: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  currentBusinessId = this.businessIdSource.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    const initialId = this.extractIdFromUrl(window.location.href);
    this.businessIdSource.next(initialId);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const navEvent = event as NavigationEnd;
      const newId = this.extractIdFromUrl(navEvent.urlAfterRedirects);
      this.businessIdSource.next(newId);
    });
  }

  private extractIdFromUrl(url: string): string | null {
    const segments = url.split('/');
    return segments[segments.length - 1].toUpperCase();
  }


  setBusinessId(id: string): void {
    this.businessIdSource.next(id);
  }



  saveimage(typeData: any, itemid: number): Observable<any> {
    return this.http.post<any>(`${this.saveImageUrl}${itemid}`, typeData);
  }

  public getSomeData(): Observable<any> {
    const apiUrl = `${this.rootApiUrl}/endpoint`;
    return this.http.get<any>(apiUrl);
  }
  public countData(): Observable<number> {
    return this.http.get<number>(`${this.url2}`);

  }


  saveLogin(login: Login): Observable<string> {
    return this.http.post<any>(this.login, login).pipe(

      catchError((error: HttpErrorResponse) => {
        // Handle login error
        if (error) {
          return throwError('Invalid credentials. Please try again.');
        } else {
          return throwError('An error occurred. Please try again later.');
        }
      })
    );
  }




  /////////////////////////////////////menu services /////////////////////////////////////////




  getimageforbackend(itemid: number): Observable<any> {
    return this.http.get<any>(`${this.menuapiUrl}${itemid}`);
  }

  getDataFromBackend(businessId: string): Observable<any> {
    const url = `${this.menugetUrl}${businessId}`;
    return this.http.get(url).pipe(
      tap(data => {
        console.log('service data:', data);
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }



  saveType(typeData: any, businessId: string): Observable<any> {
    return this.http.post<any>(`${this.saveTypeUrl}${businessId}`, typeData);
  }
  getType(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.getTypeNames}${businessId}`);
  }

  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.rootApiUrl}/my/delete/${itemId}`);
  }

  deleteimage(id: number): Observable<any> {

    return this.http.delete(`${this.rootApiUrl}/api/view/${id}`);
  }

  deletetype(typeid: String): Observable<any> {

    return this.http.delete(`${this.rootApiUrl}/my/${typeid}`)
  }


  editData1(typeid: string): Observable<any> {
    return this.http.get<any>(`${this.menuurl1}${typeid}`);
  }


  updateItem(item: any): Observable<any> {
    const updateUrl = `${this.rootApiUrl}/my/updateitem/${item.itemId}`;
    return this.http.put(updateUrl, item);
  }



  getAbout(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.getabout}${businessId}`);
  }

  setTypeId(typeId: string) {
    this.typeId = typeId;
  }

  saveItems(items: any): Observable<any> {
    return this.http.post<any>(
      `${this.rootApiUrl}/my/saving/${this.typeId}`,
      items
    );
  }


  saveItems1(items: any): Observable<any> {
    return this.http.post<any>(
      `${this.rootApiUrl}/api/view/save/1`,
      items
    );
  }





  setItemId(itemId: any) {
    this.updatedItemId = itemId;
  }
  editImage(item: any): Observable<any> {
    return this.http.put<any>(
      `http://13.233.87.183:8085/my/updateitem/${this.updatedItemId}`,
      item
    );
  }


  editItemGet(id: number): Observable<any> {
    return this.http.get<any>(`${this.menueditUrl}${id}`);
  }

  updateBusinessData(data: any, businessId: string): Observable<any> {
    if (!businessId) {
      throw new Error('Invalid businessId');
    }
    const url = `${this.viewupdateabput}${businessId}`; // Removed the trailing slash
    return this.http.put(url, data);
  }


  /////////////////////edit Deatils services ///////////////////////////////////////

  updateDetails(businessId: string, formData: any): Observable<any> {
    return this.http.put<any>(`${this.editDetailsurl2}/${businessId}`, formData);
  }

  updateDetails1(typeid: number, formData: any): Observable<any> {
    return this.http.put<any>(`${this.editDetailsurl3}/${typeid}`, formData);
  }


  /////////////////////////regist /////////////////////////

  saveRegistration(registration: FormData): Observable<any> {
    return this.http.post<any>(
      'http://13.233.87.183:8085/my/save',
      registration
    );
  }


  /////////////////////table services//////////////////////////////////
  getData(): Observable<any> {
    return this.http.get<any>(`${this.Tableurl}`);
  }

  editData(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.Tableurl1}${businessId}`);
  }
  Delete(businessId: string): Observable<any> {
    return this.http.delete<any>(`${this.TableDeleteUrl}${businessId}`);
  }

  //////////////////////////////////////////////views/////////////////////////////////////////



  getviewimageforbackend(itemid: number): Observable<any> {
    return this.http.get<any>(`${this.viewapiUrl}${itemid}`);
  }

  getviewDataFromBackend(businessId: string): Observable<any> {
    const url = `${this.viewgetUrl}${businessId}`;
    let data = this.http.get(url);
    console.log('service data implmented  ' + data);
    return this.http.get(url);
  }

  saveviewType(typeData: any, businessId: string): Observable<any> {
    return this.http.post<any>(`${this.saveTypeUrl}${businessId}`, typeData);
  }
  getviewType(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.getTypeNames}${businessId}`);
  }

  deleteviewItem(itemId: string): Observable<any> {
    return this.http.delete(`http://13.233.87.183:8085/my/delete/${itemId}`);
  }

  deletetviewype(typeid: String): Observable<any> {

    return this.http.delete(`http://13.233.87.183:8085/my/${typeid}`)
  }


  editviewData1(typeid: string): Observable<any> {
    return this.http.get<any>(`${this.viewurl1}${typeid}`);
  }


  updateviewItem(item: any): Observable<any> {
    const updateUrl = `http://13.233.87.183:8085/my/updateitem/${item.itemId}`;
    return this.http.put(updateUrl, item);
  }

  getviewAbout(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.getabout}${businessId}`);
  }

  setviewTypeId(typeId: string) {
    this.typeId = typeId;
  }

  saveviewItems(items: any): Observable<any> {
    return this.http.post<any>(
      `http://13.233.87.183:8085/my/saving/${this.typeId}`,
      items
    );
  }


  saveviewItems1(items: any): Observable<any> {
    return this.http.post<any>(
      `http://13.233.87.183:8085/api/view/save/1`,
      items
    );
  }


  setviewItemId(itemId: any) {
    this.updatedItemId = itemId;
  }
  editviewImage(item: any): Observable<any> {
    return this.http.put<any>(
      `http://13.233.87.183:8085/my/updateitem/${this.updatedItemId}`,
      item
    );
  }

  editviewItemGet(id: number): Observable<any> {
    return this.http.get<any>(`${this.vieweditUrl}${id}`);
  }

  updateViewBusinessData(data: any, businessId: string): Observable<any> {
    console.log('iam service line 97' + data, businessId);
    return this.http.put(`${this.updateabout}${businessId}`, data);
  }

}
