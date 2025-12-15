import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IStudent } from '../../models/std';
import { StudentService } from '../../services/student.service';
import { UuuidService } from '../../services/uuid.service';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {
@ViewChild('stdForm') stdForm !: NgForm
editObj !: IStudent
isInEditMode : boolean = false
  constructor(
  private _stdService : StudentService,
  private _uuid : UuuidService,
  private _snacckBar : SnackBarService
  
  ) { }
 

  ngOnInit(): void {
    this._stdService.editObj$.subscribe(res=>{
      this.isInEditMode=true
      this.stdForm.form.patchValue(res);
      this.editObj = res
    })
  }
onstdAdd(){
if(this.stdForm.valid){
let nstd :IStudent={
  ...this.stdForm.value , id:this._uuid.uuid()
}
this.stdForm.reset();
this._stdService.createStd(nstd).subscribe({
  next:res =>{
    this._snacckBar.openSnackBar('New Student Added Successfully..!!')
  },
  error:err=>{
    this._snacckBar.openSnackBar(err)
  }
})
}
}
onStdUpdate(){
  if(this.stdForm.valid){
    let ustd:IStudent={
...this.stdForm.value , id:this.editObj.id
    }
    this.isInEditMode=false;
    this.stdForm.reset()
    this._stdService.updateFlag$.next(true)
    this._stdService.updateStd(ustd).subscribe({
      next:res=>{
        this._snacckBar.openSnackBar(`Student with Name : ${ustd.fname} updated successfull..!!!`)
      }
    })
  }
}

}
