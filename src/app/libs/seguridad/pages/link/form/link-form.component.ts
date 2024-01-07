import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LinkService } from '../../../services/link.service';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})
export class LinkFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {linkId: number, padre_id: string | null},
    private ownDialogRef: MatDialogRef<LinkFormComponent>,
    private linkService: LinkService
  ) { 
    this.formGroup = new FormGroup({
      id:       new FormControl(null),
      icon:     new FormControl(null, Validators.required),
      link:     new FormControl(null, Validators.required),
      nombre:   new FormControl(null, Validators.required),
      orden:    new FormControl(null, Validators.required),
      padre_id: new FormControl(null),
      visible:  new FormControl(false, Validators.required),
    });
    this.loadData();
  }
  ngOnInit(): void {
  }

  private loadData() {
    this.formGroup.controls['padre_id'].setValue(this.data.padre_id);
    if (this.data.linkId > 0) {
      this.linkService.getById(this.data.linkId).subscribe({
        next: (response) => this.formGroup.setValue(response.link),
        error: (e) => console.log(e)
      });
    }
  }
  
  private create(){
    this.linkService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.linkService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  save(event: Event) {
    event.stopPropagation();

    if(this.data.linkId > 0) {
      this.update();
    } else {
      this.create();
    }
  }
}
