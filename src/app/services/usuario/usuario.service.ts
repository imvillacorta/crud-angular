import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  obterUsuarios() {
    return this.http.get<any>(
      `${environment.urlApi}/usuarios`);
  }

  obterUsuarioPorId(id: any) {
    return this.http.get<any>(
      `${environment.urlApi}/usuarios/${id}`);
  }

  criarUsuario(dadosUsuario: any) {
    return this.http.post<any>(
      `${environment.urlApi}/usuarios`, dadosUsuario);
  }

  editarUsuario(id: any, dadosUsuario: any) {
    return this.http.put<any>(
      `${environment.urlApi}/usuarios/${id}`, dadosUsuario);
  }

  excluirUsuario(id: any) {
    return this.http.delete(
      `${environment.urlApi}/usuarios/${id}`);
  }
}
