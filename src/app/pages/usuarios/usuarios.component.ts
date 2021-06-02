import { Component, OnInit } from '@angular/core';

import { UsuarioService } from "src/app/services/usuario/usuario.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: any = [];

  constructor(
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {
    this.obterTodosUsuarios();
  }

  obterTodosUsuarios() {
    this.usuarioService
      .obterUsuarios()
      .subscribe(resp => {
        this.usuarios = resp;
      })
  }
}
