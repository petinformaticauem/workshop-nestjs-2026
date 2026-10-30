import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Usuario } from '../generated/prisma/client.js';
import { CreateUsuarioDTO } from './dto/create-usuario.dto..js';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto.js';

@Injectable()
export class UsuariosService {
  constructor(private prismaService: PrismaService) {}



  async listar(nome?: string): Promise<Usuario[]> {
    if (nome) {
      return this.prismaService.usuario.findMany({ where: {nome: {contains: nome}} })
    }
    return this.prismaService.usuario.findMany();
  }

  async buscar(id: number): Promise<Usuario | null> {
    return this.prismaService.usuario.findUnique({where: {id: id}})
  }

  async criar(dados: CreateUsuarioDTO): Promise<Usuario> {
    return this.prismaService.usuario.create({data: dados})
  }

  async atualizar(id: number, dados: UpdateUsuarioDTO): Promise<Usuario | null> {
    return this.prismaService.usuario.update({where: {id}, data: dados})
  }

  async remover(id: number): Promise<void> {
    await this.prismaService.usuario.delete({where: {id}})
  }
}
