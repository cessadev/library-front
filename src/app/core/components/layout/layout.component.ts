import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MainComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
