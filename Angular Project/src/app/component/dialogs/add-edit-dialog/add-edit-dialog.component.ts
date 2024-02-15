import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { tab } from 'src/app/interface/new-tab-Tile.interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss'],
})
export class AddEditDialogComponent implements OnInit {
  tabs: tab[] = [];
  @Input() mode!: string;
  @Input() id!: number;
  @Input() currValue!: string;

  tabForm = this.formBuilder.group({
    newTabTitle: new FormControl('', [Validators.required]),
  });

  constructor(
    private activeModal: NgbActiveModal,
    private apiService: ApiServiceService,
    private shared:SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.mode == 'edit') {
      this.tabForm.patchValue({
        newTabTitle: this.currValue,
      });
    }
  }

  addTab() {
    if (this.mode == 'add') {
      const tabValue = this.tabForm.value as tab[];
      this.apiService.postTabsData(tabValue).subscribe((saveRes) => {
        this.activeModal.close(saveRes);
      });
    } else if (this.mode == 'edit') {
      const tabId = this.id;
      const updatedTabsData = this.tabForm.value as tab[];
      this.apiService
        .updateTabsData(tabId, updatedTabsData)
        .subscribe((saveRes:any) => {
          const editData ={
            saveRes,
            type:this.mode
          }
          this.activeModal.close(editData);
          this.shared.editText$.next(saveRes.id)
        });
    }
  }

  closeModel() {
    this.activeModal.close();
  }
}
