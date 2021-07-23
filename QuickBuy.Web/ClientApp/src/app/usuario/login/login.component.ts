import { Template } from "@angular/compiler/src/render3/r3_ast";
import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../modelo/usuario";
import { ActivatedRoute, Router } from "@angular/router"; 
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

  public usuario;
  public returnUrl: string;
  public mensagem: string;
  private ativar_spinner: boolean;
  

  constructor(private router: Router, private activateRouter: ActivatedRoute, private usuarioServico: UsuarioServico) {

  }

  ngOnInit(): void {
    this.returnUrl = this.activateRouter.snapshot.queryParams['returnUrl'];
    this.usuario = new Usuario();
  }

  entrar() {

    this.ativar_spinner = true;

    this.usuarioServico.verificarUsuario(this.usuario)

      .subscribe(

        usuario_json => {

          //sessionStorage.setItem("usuario-autenticado", "1");

          this.usuarioServico.usuario = usuario_json;

          if (this.returnUrl == null) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate([this.returnUrl]);
          }

        },
        err => {
          console.log(err.error);
          this.mensagem = err.error;
          this.ativar_spinner = false;
        }
      );

    //if (this.usuario.email == "luisriccio0@gmail.com" && this.usuario.senha == "lakers*06")
    //  sessionStorage.setItem("usuario-autenticado", "1");
    //  this.router.navigate([this.returnUrl]);
  }

}
