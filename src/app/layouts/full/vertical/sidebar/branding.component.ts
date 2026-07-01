
import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  imports: [],
  template: `
    <div class="branding">
      @if(options.theme === 'light') {
      <a href="/">
        <img
          width="150"
          src="./assets/images/logos/logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
      } @if(options.theme === 'dark') {
      <a href="/">
        <img
          width="150"
          src="./assets/images/logos/logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
      }
    </div>
  `
})
export class BrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) { }
}
