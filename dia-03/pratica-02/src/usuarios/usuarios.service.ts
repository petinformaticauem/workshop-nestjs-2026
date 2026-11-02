import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma, Usuario } from '../generated/prisma/client.js';
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

  async buscar(id: number): Promise<Usuario> {
    const usuario = await this.prismaService.usuario.findUnique({where: {id: id}})
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  async criar(dados: CreateUsuarioDTO): Promise<Usuario> {
    try {
      return await this.prismaService.usuario.create({data: dados})
    } catch (erro) {
      if (
        erro instanceof Prisma.PrismaClientKnownRequestError &&
        erro.code === 'P2002'
      ) {
        throw new ConflictException('E-mail já cadastrado');
      }
      throw erro;
    }
  }

  async atualizar(id: number, dados: UpdateUsuarioDTO): Promise<Usuario> {
    await this.buscar(id);
    return this.prismaService.usuario.update({where: {id}, data: dados})
  }

  async remover(id: number): Promise<void> {
    await this.buscar(id);
    await this.prismaService.usuario.delete({where: {id}})
  }
}
