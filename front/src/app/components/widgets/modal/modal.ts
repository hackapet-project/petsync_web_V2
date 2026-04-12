import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-modal',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {

}
