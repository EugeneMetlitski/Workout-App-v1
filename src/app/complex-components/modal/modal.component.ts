import { Component, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @HostListener('click', ['$event']) onclose(event: MouseEvent) {
    if (event.target === this.el.nativeElement) { this.close.emit(); }
  }

  constructor(private el: ElementRef) {}

}
