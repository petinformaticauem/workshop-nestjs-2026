import { Controller, Get } from '@nestjs/common';

@Controller('usuarios')
export class UsuariosController {
  @Get()
  listar() {
    return [{ id: 1, nome: 'Luis', email: 'luis@teste.br' }];
  }
}
