import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.interface.js';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    { id: 1, nome: 'Ana Paula Crippa', email: 'ana@uem.br' },
    { id: 2, nome: 'Josh Dun', email: 'josh@uem.br' },
    { id: 3, nome: 'Lucas Fratus', email: 'lucas@uem.br' },
    { id: 4, nome: 'Oliver Sykes', email: 'oliver@uem.br' },
    { id: 5, nome: 'Tyler Joseph', email: 'tyler@uem.br' },
  ];
  private proximoId = this.usuarios.length + 1;

  listar(nome?: string): Usuario[] {
    if (nome) {
      return this.usuarios.filter((usuario) => usuario.nome.includes(nome));
    }
    return this.usuarios;
  }

  buscar(id: number): Usuario | undefined {
    return this.usuarios.find((usuario) => usuario.id === id);
  }

  criar(dados: any): Usuario {
    const novoUsuario: Usuario = {
      id: this.proximoId++,
      nome: dados.nome,
      email: dados.email,
      idade: dados.idade,
    };
    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  atualizar(id: number, dados: any): Usuario | undefined {
    const usuario = this.buscar(id);
    if (!usuario) return;
    if (dados.nome) usuario.nome = dados.nome;
    if (dados.email) usuario.email = dados.email;
    if (dados.idade) usuario.idade = dados.idade;
    return usuario;
  }

  remover(id: number): void {
    this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
  }
}
