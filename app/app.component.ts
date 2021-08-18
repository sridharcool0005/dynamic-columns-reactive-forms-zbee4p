import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { CustomRequiredValidator } from "./custom-required-validator";
import { UpdateFormArrayValidity } from "./rx-form-helper";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modalRef: BsModalRef;
  addForm: FormGroup;

  extraColumnsFormGroup: FormGroup; // +

  constructor(private fb: FormBuilder,
    private modalService: BsModalService) {

    this.extraColumnsFormGroup = this.fb.group({
      driver: [null],
      contact_number: [null],
      transportation_unit: [null],
      special_instructions: [null],
    });

    this.extraColumnsFormGroup.valueChanges.subscribe(() => {
      let rows = this.addForm.get('rows') as FormArray;
      UpdateFormArrayValidity(rows);
    });

    this.addForm = this.fb.group({
      rows: this.fb.array([])
    });
    this.initGroup();
  }

  ngOnInit() {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onDeleteRow(rowIndex) {
    let rows = this.addForm.get('rows') as FormArray;
    rows.removeAt(rowIndex)
  }

  initGroup() {
    let rows = this.addForm.get('rows') as FormArray;
    rows.push(this.fb.group({
      description: [null, Validators.required],
      pickup_area: [null, Validators.required],
      pickup_time: [null, Validators.required],
      sign_board: [null, Validators.required],
      driver: [null, CustomRequiredValidator(this.extraColumnsFormGroup.get('driver'))],
      contact_number: [null, CustomRequiredValidator(this.extraColumnsFormGroup.get('contact_number'))],
      transportation_unit: [null, CustomRequiredValidator(this.extraColumnsFormGroup.get('transportation_unit'))],
      special_instructions: [null, CustomRequiredValidator(this.extraColumnsFormGroup.get('special_instructions'))],
    }))
  }

}
