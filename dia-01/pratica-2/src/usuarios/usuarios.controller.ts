import { Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpCode } from '@nestjs/common';

@Controller('usuarios')
export class UsuariosController {
  private usuarios = [
    { id: 1, nome: 'Ana Paula Crippa', email: 'ana@uem.br' },
    { id: 2, nome: 'Josh Dun', email: 'josh@uem.br' },
    { id: 3, nome: 'Lucas Fratus', email: 'lucas@uem.br' },
    { id: 4, nome: 'Oliver Sykes', email: 'oliver@uem.br' },
    { id: 5, nome: 'Tyler Joseph', email: 'tyler@uem.br' },
  ];

  @Get()
  listar(@Query('nome') nome?: string) {
    if (nome) {
      return this.usuarios.filter((usuario) => usuario.nome.includes(nome));
    }
    return this.usuarios;
  }

  @Get(':id')
  listarId(@Param('id') id: string) {
    return this.usuarios.find((usuario) => usuario.id === Number(id));
  }

  @Post()
  criar(@Body() dados: any) {
    const novoUsuario = {
      id: this.usuarios.length + 1,
      nome: dados.nome,
      email: dados.email,
    };
    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dados: any) {
    const usuario = this.usuarios.find((usuario) => usuario.id === Number(id));
    if (!usuario) return;
    if (dados.nome) usuario.nome = dados.nome;
    if (dados.email) usuario.email = dados.email;
    return usuario;
  }

  @Delete(':id')
  @HttpCode(204)
  remover(@Param('id') id: string) {
    this.usuarios = this.usuarios.filter((usuario) => usuario.id !== Number(id));
  }
}
