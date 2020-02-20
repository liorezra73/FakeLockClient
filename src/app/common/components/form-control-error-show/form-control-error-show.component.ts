import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-control-error-show',
  templateUrl: './form-control-error-show.component.html',
  styleUrls: ['./form-control-error-show.component.css']
})
export class FormControlErrorShowComponent implements OnInit {

  @Input() errors: string[];
  constructor() { }

  ngOnInit() {
    setTimeout(() => {console.log(this.errors)},5000)
  }

}
