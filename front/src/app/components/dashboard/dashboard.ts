import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalList } from '../widgets/animal-list/animal-list';

@Component({
  selector: 'app-dash',
  imports: [
    CommonModule,
    AnimalList
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  ngOnInit(): void {}
}
