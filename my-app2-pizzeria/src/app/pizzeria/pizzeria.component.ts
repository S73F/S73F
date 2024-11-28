import { Component, EventEmitter, Output } from '@angular/core';
import { ListaPizzeComponent } from './lista-pizze/lista-pizze.component';
import { PizzaComponent } from './pizza/pizza.component';
import { DUMMY_PIZZA } from './DUMMY_PIZZA';
import { Pizza } from './pizza/pizza.model';

@Component({
  selector: 'app-pizzeria',
  standalone: true,
  imports: [ListaPizzeComponent, PizzaComponent],
  templateUrl: './pizzeria.component.html',
  styleUrl: './pizzeria.component.css',
})
export class PizzeriaComponent {
  pizze: Pizza[] = DUMMY_PIZZA;

  pizza!: Pizza;

  onSelectPizza(pizza: Pizza) {
    this.pizza = pizza;
  }
}
