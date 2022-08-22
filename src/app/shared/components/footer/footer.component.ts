import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  copyright: string = '';
  constructor() {}

  ngOnInit(): void {
    this.copyright =
      'El acceso o uso no autorizado se considera un delito. Derechos protegidos por Mercantil C.A., Banco Universal. RIF: J-00002961-0.';
  }

}
