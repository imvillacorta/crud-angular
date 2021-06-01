import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios = [
    {
      id: 1,
      nome: 'Ivan Villacorta',
      email: 'ivan_mv23@hotmai.com',
      cpf: '39293316838'
    },
    {
      id: 2,
      nome: 'Adalberto Torres',
      email: 'adal@hgmail.com',
      cpf: '39293316839'
    },
    {
      id: 3,
      nome: 'Maria da Silva',
      email: 'maria_silva@hotmai.com',
      cpf: '39293316840'
    }
  ];

  constructor(
    
  ) {
  }

  ngOnInit(): void {
  }

}
