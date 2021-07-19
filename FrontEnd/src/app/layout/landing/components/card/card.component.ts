import { Component, Input } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() item: Item;
  @Input() showButton: boolean;

  constructor() { }

  scroll(el: string) {
    const element = document.getElementById(el);
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
