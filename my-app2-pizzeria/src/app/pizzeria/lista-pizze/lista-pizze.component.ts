import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pizza } from '../pizza/pizza.model';

@Component({
  selector: 'app-lista-pizze',
  standalone: true,
  imports: [],
  templateUrl: './lista-pizze.component.html',
  styleUrl: './lista-pizze.component.css',
})
export class ListaPizzeComponent {
  @Input({ required: true }) listaPizze!: Pizza[];

  @Output() selectedPizza = new EventEmitter<Pizza>();

  onSelectedPizza(pizza: Pizza) {
    this.selectedPizza.emit(pizza);
  }
}
