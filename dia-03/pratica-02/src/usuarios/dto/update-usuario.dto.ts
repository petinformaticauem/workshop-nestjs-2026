import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsInt, IsOptional } from 'class-validator';

export class UpdateUsuarioDTO {
    @ApiPropertyOptional({ example: 'Carlos' })
    @IsOptional()
    @IsString({ message: 'O nome deve ser um texto' })
    @IsNotEmpty({ message: 'O campo não pode ser vazio' })
    nome?: string

    @ApiPropertyOptional({ example: 'carlos@uem.br' })
    @IsOptional()
    @IsEmail()
    email?: string

    @ApiPropertyOptional({ example: 25, type: 'integer' })
    @IsOptional()
    @IsInt()
    idade?: number
}
