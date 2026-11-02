import { Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpCode, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsuariosService } from './usuarios.service.js';
import { CreateUsuarioDTO } from './dto/create-usuario.dto..js';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto.js';
import { ApiKeyGuard } from '../auth/api-key/api-key.guard.js';
import { TransformInterceptor } from '../transform/transform.interceptor.js';

@Controller('usuarios')
@UseInterceptors(TransformInterceptor)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  listar(@Query('nome') nome?: string) {
    return this.usuariosService.listar(nome);
  }

  @Get(':id')
  listarId(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.buscar(id);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  criar(@Body() dados: CreateUsuarioDTO) {
    return this.usuariosService.criar(dados);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados: UpdateUsuarioDTO) {
    return this.usuariosService.atualizar(id, dados);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remover(id);
  }
}
