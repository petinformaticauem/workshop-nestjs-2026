import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsInt, IsOptional } from 'class-validator';

export class CreateUsuarioDTO {
    @ApiProperty({ example: 'Carlos' })
    @IsString({ message: 'O nome deve ser um texto' })
    @IsNotEmpty({ message: 'O campo não pode ser vazio' })
    nome: string

    @ApiProperty({ example: 'carlos@uem.br' })
    @IsEmail()
    email: string

    @ApiPropertyOptional({ example: 25, type: 'integer' })
    @IsOptional()
    @IsInt()
    idade?: number
}
