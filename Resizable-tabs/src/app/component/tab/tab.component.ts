import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tab } from 'src/app/interface/new-tab-Tile.interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { AddEditDialogComponent } from '../dialogs/add-edit-dialog/add-edit-dialog.component';
import {
  faAngleDown,
  faPen,
  faPlus,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
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
  closeIcon = faXmark;
  userIcon = faUser;
  isMobile!: boolean;

  constructor(
    private apiService: ApiServiceService,
    private shared: SharedService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getData();
    this.activeTabIndex = 0;
    this.shared.editText$.subscribe((res) => {
      if (res !== 0) {
        this.activeTabIndex = res;
      }
    });
    this.checkIfMobile();
    window.addEventListener('resize', () => {
      this.checkIfMobile();
    });
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  openAddEditDialog(selected?: string, id?: number, currentValue?: string) {
    const modalRef = this.modalService.open(AddEditDialogComponent, {
      size: 'md',
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.mode = selected;
    modalRef.componentInstance.currentValue = currentValue;
    modalRef.result.then(
      (data) => {
        if (data) {
          if (data.type == 'edit') {
            const editedTabIndex = this.tabs.findIndex(
              (tab) => tab.id === data.saveRes.id
            );
            this.tabs[editedTabIndex] = data.saveRes;
            if (editedTabIndex !== -1) {
              this.activeTabIndex = editedTabIndex;
            } else {
              this.activeTabIndex = 0;
            }
          } else {
            this.tabs.push(data);
            this.activeTabIndex = this.tabs.length - 1;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // closeTab(item: number, index: number) {
  //   this.apiService.deleteTabsData(item).subscribe(
  //     (res) => {
  //       this.tabs = this.tabs.filter((res: tab) => {
  //         return res.id !== item;
  //       });
  //       this.activeTabIndex = this.activeTabIndex - 1;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
  closeTab(item: number, index: number) {
    this.apiService.deleteTabsData(item).subscribe(
      () => {
        this.tabs = this.tabs.filter(tab => tab.id !== item);
        if (index === this.activeTabIndex) {
          if (this.tabs.length > 0) {
            this.activeTabIndex = Math.min(index, this.tabs.length - 1);
          } else {
            // this.activeTabIndex = -1;
           
          }
        }
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
