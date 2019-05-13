import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'confirm-dialog', 
    templateUrl: './confirmDialog.component.html'
})

export class ConfirmDialogComponent {

    message: string = '';
    confirmButtontext: string = '';    
    cancelButtontext: string = '';
    
    // constructor(@Inject(MAT_DIALOG_DATA) private data: any, 
    //             private _dialogRef: MatDialogRef<ConfirmDialogComponent>) {

    //         if(data) {
    //             this.message = data.message;
    //         }
    //         if(data.buttonText) {
    //             this.confirmButtontext = data.buttonText.ok;
    //             this.cancelButtontext = data.buttonText.cancel;
    //         }
    // }

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
            if(data){
                this.message = data.message;
                if (data.buttonText) {
                    this.confirmButtontext = data.buttonText.ok;
                    this.cancelButtontext = data.buttonText.cancel;
                }
            }
    }

    onConfirmClick() {
        this.dialogRef.close(true);
    }
}