import { CartaoService } from './../../services/cartao.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cartao-credito',
  templateUrl: './cartao-credito.component.html',
  styleUrls: ['./cartao-credito.component.css']
})
export class CartaoCreditoComponent implements OnInit {
  listarCartoes: any[] = [];
  accion = 'Inserir';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService,
    private _cartaoService: CartaoService ) { 
    this.form =  this.fb.group({
      titular: ['', Validators.required],
      numeroCartao: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      dataExpiracao: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.obterCartoes();
  }

  obterCartoes() {
    this._cartaoService.getlistarCartoes().subscribe(data => {
      console.log(data);
      this.listarCartoes = data;
      }, error => {
        console.log(error);
      })
  }

  guardarCartao(){

    const cartao: any ={
      titular: this.form.get('titular')?.value,
      numeroCartao: this.form.get('numeroCartao')?.value,
      dataExpiracao: this.form.get('dataExpiracao')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    if(this.id == undefined){
      //Adicionamos cartão
      this._cartaoService.saveCartao(cartao).subscribe(data => {
        this.toastr.success('Cartão Registado com sucesso!','Cartão Registado');
        this.obterCartoes()
        this.form.reset();
        }, error => {
          this.toastr.error('Opss... ocorreu um erro!','Guardar Cartão');
          console.log(error);
        })
    }else {

      cartao.id = this.id ;
      //Editamos cartão
       this._cartaoService.updateCartao(this.id, cartao).subscribe(data => {
         this.form.reset();
         this.accion = 'Adicionar';
         this.id = undefined;
         this.toastr.info('Cartão Atualizado com sucesso!','Cartão Atualizado');
         this.obterCartoes();
        }, error =>    {
        console.log(error);
        });
    }
    
  }

  eliminarCartao(id: number) {
    //this.listarCartoes.splice(index, 1);
    this._cartaoService.deleteCartao(id).subscribe(data => {
      this.toastr.error('Cartão Eliminado com sucesso!','Cartão Eliminado');
      this.obterCartoes();
    }, error =>    {
      console.log(error);
    });
 
  }

  editarCartao(cartao: any) {
    this.accion = 'Editar';
    this.id = cartao.id;

    this.form.patchValue({
      titular: cartao.titular,
      numeroCartao: cartao.numeroCartao,
      dataExpiracao: cartao.dataExpiracao,
      cvv: cartao.cvv
    })
 //   this._cartaoService.updateCartao(this.id, cartao).subscribe(data => {
  //    this.toastr.success('Cartão Atualizado com sucesso!','Cartão Atualizado');
 ////     this.obterCartoes();
  //  }, error =>    {
   //   console.log(error);
 //   });
  }

}
