import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CpfValidator } from "src/app/validators/cpf.validator";
import { CepService } from "src/app/services/cep/cep.service";
import { UsuarioService } from "src/app/services/usuario/usuario.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  form: any = FormGroup;
  submitted = false;
  dadosCep: any;
  idUsuario: any;
  isEdit = false;
  isReadOnly = false;
  usuario: any;
  valorCpf: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cepService: CepService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, CpfValidator.validaCpf]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: [''],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.obterId();

  }

  obterId() {
    this.route.paramMap.
      subscribe((params: any) => {
        this.idUsuario = params.get('id');
        this.verificaTipoAcao();
      })
  }

  verificaTipoAcao() {
    if (this.router.url.split('/')[2] === 'editar') {
      this.isEdit = true;
      this.isReadOnly = false;
      this.form.controls.cpf.disable();
      this.popularDados();
    }

    if (this.router.url.split('/')[2] === 'visualizar') {
      this.isReadOnly = true;
      this.isEdit = false;
      this.form.disable();
      this.popularDados();
    }
  }

  popularDados() {
    this.usuarioService
      .obterUsuarioPorId(this.idUsuario)
      .subscribe(resp => {
        this.usuario = resp;
        this.form.setValue({
          nome: this.usuario.nome,
          cpf: this.usuario.cpf,
          email: this.usuario.email,
          cep: this.usuario.endereco[0].cep,
          endereco: this.usuario.endereco[0].rua,
          numero: this.usuario.endereco[0].numero,
          complemento: this.usuario.endereco[0].complemento,
          bairro: this.usuario.endereco[0].bairro,
          cidade: this.usuario.endereco[0].cidade,
          estado: this.usuario.endereco[0].estado
        })
      })
  }

  get nome() {
    return this.form.get('nome');
  }

  get cpf() {
    return this.form.get('cpf');
  }

  get email() {
    return this.form.get('email');
  }

  get cep() {
    return this.form.get('cep');
  }

  get endereco() {
    return this.form.get('endereco');
  }

  get numero() {
    return this.form.get('numero');
  }

  get complemento() {
    return this.form.get('complemento');
  }

  get bairro() {
    return this.form.get('bairro');
  }

  get cidade() {
    return this.form.get('cidade');
  }

  get estado() {
    return this.form.get('estado');
  }

  buscarCep() {

    if (this.form.controls.cep.status == 'VALID') {
      this.cepService
        .obterDadosCep(this.form.value.cep)
        .subscribe(resp => {

          if (resp.erro) {
            Swal.fire({
              icon: 'error',
              title: 'Ops!',
              text: "Este CEP não foi encontrado.",
              confirmButtonText: 'ENTENDI',
              confirmButtonColor: '#0d6efd',
              allowOutsideClick: false
            }).then((result) => {
              if (result.dismiss) {
              } else {
              }
            });
          }

          else {
            this.dadosCep = resp;
            this.populaCamposEndereco();
          }
        }, err => {
          console.error();
        })
    }
  }

  populaCamposEndereco() {
    this.form.patchValue({
      endereco: this.dadosCep.logradouro,
      bairro: this.dadosCep.bairro,
      cidade: this.dadosCep.localidade,
      estado: this.dadosCep.uf
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.status == 'VALID') {
      if (this.isEdit) {
        this.valorCpf = this.usuario.cpf;
      }
      else {
        this.valorCpf = this.form.value.cpf;
      }

      let dadosUsuario = {
        nome: this.form.value.nome,
        cpf: this.valorCpf,
        email: this.form.value.email,
        endereco: [
          {
            cep: this.form.value.cep,
            rua: this.form.value.endereco,
            numero: this.form.value.numero,
            complemento: this.form.value.complemento,
            bairro: this.form.value.bairro,
            cidade: this.form.value.cidade,
            estado: this.form.value.estado
          }
        ]
      }

      if (this.isEdit) {
        this.usuarioService
          .editarUsuario(this.idUsuario, dadosUsuario)
          .subscribe(resp => {
            Swal.fire({
              icon: 'success',
              title: 'Usuário Alterado',
              text: "Seu usuário foi alterado com sucesso.",
              confirmButtonText: 'ENTENDI',
              confirmButtonColor: '#0d6efd',
              allowOutsideClick: false
            }).then((result) => {
              if (result.dismiss) {
              } else {
                this.submitted = false;
                this.form.reset();
                this.router.navigate(['usuarios']);
              }
            });
          }, error => {
            console.error();
          })
      }

      else {
        this.usuarioService
          .criarUsuario(dadosUsuario)
          .subscribe(resp => {
            Swal.fire({
              icon: 'success',
              title: 'Usuário Criado',
              text: "Seu usuário foi criado com sucesso.",
              confirmButtonText: 'ENTENDI',
              confirmButtonColor: '#0d6efd',
              allowOutsideClick: false
            }).then((result) => {
              if (result.dismiss) {
              } else {
                this.submitted = false;
                this.form.reset();
                this.router.navigate(['usuarios']);
              }
            });
          }, error => {
            console.error();
          })
      }


    }
  }

}
