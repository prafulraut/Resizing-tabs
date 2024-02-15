import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { tab } from 'src/app/interface/new-tab-Tile.interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  tabs: tab[] = [];
  activeTabIndex: number = -1;
  constructor(
    private apiService: ApiServiceService,
    private activeModal: NgbActiveModal,
    private shared: SharedService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.apiService.getTabsData().subscribe(
      (res: tab[]) => {
        this.tabs = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeTab(item: number) {
    this.apiService.deleteTabsData(item).subscribe(
      (res) => {
        this.getData();
        this.shared.userSource$.next(item);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeModel() {
    this.activeModal.close();
  }
}
