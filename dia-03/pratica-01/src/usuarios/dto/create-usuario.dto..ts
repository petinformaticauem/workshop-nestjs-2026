import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDTO {
    @ApiProperty({ example: 'Carlos' })
    nome: string
    @ApiProperty({ example: 'carlos@uem.br' })
    email: string
    @ApiPropertyOptional({ example: 25, type: 'integer' })
    idade?: number
}
