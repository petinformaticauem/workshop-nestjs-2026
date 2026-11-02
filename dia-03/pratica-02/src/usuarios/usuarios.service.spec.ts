import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';

describe('UsuariosService', () => {
  let service: UsuariosService;
  const prisma = {
    usuario: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it.each(['buscar', 'atualizar', 'remover'] as const)(
    '%s lança 404 quando o usuário não existe',
    async (operacao) => {
      prisma.usuario.findUnique.mockResolvedValue(null);

      const resultado = operacao === 'atualizar'
        ? service.atualizar(999999, { nome: 'Usuário inexistente' })
        : service[operacao](999999);

      const erro = await resultado.catch((error: unknown) => error);
      expect(erro).toBeInstanceOf(NotFoundException);
      expect((erro as NotFoundException).getStatus()).toBe(404);
      expect((erro as NotFoundException).message).toBe('Usuário não encontrado');
      expect(prisma.usuario.update).not.toHaveBeenCalled();
      expect(prisma.usuario.delete).not.toHaveBeenCalled();
    },
  );

  it('retorna o usuário atualizado sem consultar novamente', async () => {
    const usuario = { id: 1, nome: 'Vitor', email: 'vitor@uem.br', idade: null };
    const atualizado = { ...usuario, nome: 'Vitor atualizado' };
    prisma.usuario.findUnique.mockResolvedValue(usuario);
    prisma.usuario.update.mockResolvedValue(atualizado);

    await expect(service.atualizar(1, { nome: atualizado.nome })).resolves.toEqual(atualizado);
    expect(prisma.usuario.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.usuario.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { nome: atualizado.nome },
    });
  });

  it('converte e-mail duplicado em conflito HTTP 409', async () => {
    prisma.usuario.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed', { code: 'P2002', clientVersion: '7.10.0' },
    ));

    const erro = await service.criar({ nome: 'Vitor', email: 'vitor@uem.br' })
      .catch((error: unknown) => error);

    expect(erro).toBeInstanceOf(ConflictException);
    expect((erro as ConflictException).getStatus()).toBe(409);
    expect((erro as ConflictException).message).toBe('E-mail já cadastrado');
  });

  it.each([
    new Error('Falha inesperada'),
    new Prisma.PrismaClientKnownRequestError(
      'Database unavailable', { code: 'P2024', clientVersion: '7.10.0' },
    ),
  ])('relança os demais erros sem modificá-los: %s', async (erro) => {
    prisma.usuario.create.mockRejectedValue(erro);

    await expect(service.criar({ nome: 'Vitor', email: 'vitor@uem.br' }))
      .rejects.toBe(erro);
  });
});
