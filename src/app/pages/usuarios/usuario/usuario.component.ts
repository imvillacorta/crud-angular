import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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
      this.usuarioService
        .criar(this.form)
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
