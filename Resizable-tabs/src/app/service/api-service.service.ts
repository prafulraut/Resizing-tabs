import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tab } from '../interface/new-tab-Tile.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  apiUrl = 'http://localhost:3000/tabs';

  constructor(private http: HttpClient) {}

  postTabsData(tab: tab[]) {
    return this.http.post(this.apiUrl, tab);
  }

  getTabsData() {
    return this.http.get<tab[]>(this.apiUrl);
  }

  deleteTabsData(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTabsData(tabId: number, updatedTabData: tab[]) {
    return this.http.put(`${this.apiUrl}/${tabId}`, updatedTabData);
  }
}
