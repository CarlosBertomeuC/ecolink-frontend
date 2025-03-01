import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subscription-popup',
  templateUrl: './subscription-popup.component.html',
  styleUrls: ['./subscription-popup.component.scss']
})
export class SubscriptionPopupComponent {
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
