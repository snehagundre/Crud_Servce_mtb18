import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent implements OnInit {

  constructor(private _matdilogReff : MatDialogRef<GetConfirmComponent>,
  @Inject(MAT_DIALOG_DATA) getmsg : string

  ) { this.msg = getmsg}
  msg !:string

  ngOnInit(): void {
  }
  onClose(flag:boolean){
   this._matdilogReff.close(flag)
  }

}
