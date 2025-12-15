import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { IStudent } from '../../models/std';
import { SnackBarService } from '../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss']
})
export class StdTableComponent implements OnInit {
  stdarr : Array<IStudent> = []
  constructor(
    private stdService : StudentService,
    private _snackbar : SnackBarService,
    private _matDilog : MatDialog

  ) { }
editId !: string
  ngOnInit(): void {
    this.stdService.fetchAllStds().subscribe(res=>{
     this.stdarr = res
    })
    this.stdService.updateFlag$.subscribe(res=>{
      this.editId = ''
    })
  }
  onStdRemove(id:string){
    const matDilogConfig = new MatDialogConfig()
    matDilogConfig.width = '400px'
    matDilogConfig.maxWidth = '90%'
    matDilogConfig.disableClose=true
    matDilogConfig.data=`Are You sure , you Want To Remove Student Width ${id}`
 
    let MatDialogRef = this._matDilog.open(GetConfirmComponent,matDilogConfig)
    MatDialogRef.afterClosed().subscribe(res=>{
  if(res){
        this.stdService.removeStd(id).subscribe({
    next:res=>{
      this._snackbar.openSnackBar(res.messege)
    },
    error:err=>{
      this._snackbar.openSnackBar(err)
    }
   })
  }
    })

  //  this.stdService.removeStd(id).subscribe({
  //   next:res=>{
  //     this._snackbar.openSnackBar(`student with : ${id} removed succesfully !!!`)
  //   },
  //   error:err=>{
  //     this._snackbar.openSnackBar(err)
  //   }
  //  })
  }
  onstdEdit(estd:IStudent){
  this.stdService.editObj$.next(estd)
  this.editId = estd.id
  }
  
}
