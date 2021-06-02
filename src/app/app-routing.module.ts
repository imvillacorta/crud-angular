import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { UsuarioComponent } from "./pages/usuarios/usuario/usuario.component";

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'cadastrar',
    component: UsuarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
