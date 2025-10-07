import { Component } from '@angular/core';
import {ProductionControl} from '../production-control/production-control'

@Component({
  selector: 'app-terminal',
  imports: [ProductionControl],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})
export class Terminal {

}
