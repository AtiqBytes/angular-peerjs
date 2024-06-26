import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VoiceRecognitionService } from '../services/voice-recognition.service';


@Component({
    selector: 'app-call-info-dialog',
    templateUrl: './callinfo-dialog.component.html',
    styleUrls: ['./callinfo-dialog.component.scss'],
    providers: [VoiceRecognitionService]

})
export class CallInfoDialogComponents {

    text: string;

    constructor(
        public dialogRef: MatDialogRef<CallInfoDialogComponents>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _snackBar: MatSnackBar, 
        public service : VoiceRecognitionService
    ) {
        
    this.service.init()
     }

     ngOnInit(): void {
    }
  
    
  public startService(){
    this.service.start()

  }


    public showCopiedSnackBar() {        
        this._snackBar.open('Peer ID Copied!', 'Hurrah', {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

    }
}

export interface DialogData {
    peerId?: string;
    joinCall: boolean
}