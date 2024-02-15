import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tab } from 'src/app/interface/new-tab-Tile.interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { AddEditDialogComponent } from '../dialogs/add-edit-dialog/add-edit-dialog.component';
import { HistoryComponent } from '../dialogs/history/history.component';
import { faAngleDown, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/service/shared.service';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  tabs: tab[] = [];
  activeTabIndex: number = 1;
  downIcon = faAngleDown;
  editIcon = faPen;
  plusIcon = faPlus;

  constructor(
    private apiService: ApiServiceService,
    private shared: SharedService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getData();
    this.activeTabIndex = 0;
    this.shared.userSource$.subscribe((res) => {
      this.tabs.splice(res, 1);
      this.getData();
      this.activeTabIndex = this.activeTabIndex - 1;
    });
    this.shared.editText$.subscribe((res) => {
      this.getData();
      this.activeTabIndex = res;
    });
  }

  openAddEditDialog(selected?: string, id?: number, currValue?: string) {
    const modalRef = this.modalService.open(AddEditDialogComponent, {
      size: 'md',
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.mode = selected;
    modalRef.componentInstance.currValue = currValue;
    modalRef.result.then(
      (data) => {
        if (data) {
          this.getData();
          if (data.type == 'edit') {
            this.activeTabIndex = data.saveRes.id - 1;
            console.log(this.activeTabIndex);
            
          } else {
            this.activeTabIndex = this.tabs.length;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openHistoryDialog() {
    const modalRef = this.modalService.open(HistoryComponent, {
      size: 'md',
    });
  }

  closeTab(item: number) {
    this.apiService.deleteTabsData(item).subscribe(
      (res) => {
        this.getData();
        this.activeTabIndex = this.activeTabIndex - 1;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  activateTab(index: number) {
    this.activeTabIndex = index;
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
}
