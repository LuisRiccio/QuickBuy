import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";

@Component({
  selector: "pesquisa-produto",
  templateUrl: "./pesquisa.produto.component.html",
  styleUrls: ["./pesquisa.produto.component.css"]
})

export class PesquisaProdutoComponent implements OnInit{

  public produtos: Produto[];

  ngOnInit(): void {

  }

  constructor(private router: Router, private produtoServico: ProdutoServico) {
    this.produtoServico.obterTodosProdutos()
      .subscribe(
        produtos => {
          this.produtos = produtos

        },
        e => {
          console.log(e.error);
        });
  }

  public adicionarProdutos() {
    sessionStorage.setItem('produtoSession', "");
    this.router.navigate(['/produto']);
  }

  public deletarProduto(produto: Produto) {
    var retorno = confirm("Deseja Realmente deletar o produto selecionado?");

    if (retorno == true) {
      this.produtoServico.deletar(produto)
        .subscribe(
          produtos => {
            this.produtos = produtos;

          },             
          e => {
            console.log(e.errors);
          });
    }     
  }

  public editarProduto(produto: Produto) {

    sessionStorage.setItem('produtoSession', JSON.stringify(produto));
    this.router.navigate(['/produto']);

  }
}
