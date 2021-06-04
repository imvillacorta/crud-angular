import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from "src/app/services/usuario/usuario.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: any = [];

  constructor(
    private router: Router,
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

  editar(idUsuario: any) {
    this.router.navigate([
      `usuarios/editar/${idUsuario}`,
    ]);
  }

  visualizar(idUsuario: any) {
    this.router.navigate([
      `usuarios/visualizar/${idUsuario}`,
    ]);
  }

  excluir(idUsuario: any) {
    Swal.fire({
      icon: 'question',
      text: "Deseja excluir este usuário?",
      confirmButtonText: 'SIM',
      cancelButtonText: 'NÃO',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#bb2d3b',
      showCancelButton: true,
      reverseButtons: true,
      allowOutsideClick: false
    }).then((result) => {
      if (result.dismiss) {
      }
      else {

        this.usuarioService
          .excluirUsuario(idUsuario)
          .subscribe(resp => {
            Swal.fire({
              icon: 'success',
              title: 'Usuário Excluído',
              text: "Usuário excluído com sucesso.",
              confirmButtonText: 'ENTENDI',
              confirmButtonColor: '#0d6efd',
              allowOutsideClick: false
            }).then((result) => {
              if (result.dismiss) {
              }
              else {
                this.obterTodosUsuarios();
              }
            });

          })


      }
    });
  }
}
