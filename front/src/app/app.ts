import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Icon } from './core/services/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly title = signal('front');
  constructor(private iconService: Icon) {}

  ngOnInit() {
    this.iconService.registerIcons();
  }
}
