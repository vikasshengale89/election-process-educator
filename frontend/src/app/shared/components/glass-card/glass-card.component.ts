import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="glass-panel" [class]="extraClass()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class GlassCardComponent {
  extraClass = input<string>('');
}
