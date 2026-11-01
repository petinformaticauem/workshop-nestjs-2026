import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUsuarioDTO {
    @ApiPropertyOptional({ example: 'Carlos' })
    nome?: string
    @ApiPropertyOptional({ example: 'carlos@uem.br' })
    email?: string
    @ApiPropertyOptional({ example: 25, type: 'integer' })
    idade?: number
}
