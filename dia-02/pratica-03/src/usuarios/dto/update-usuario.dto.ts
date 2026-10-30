import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUsuarioDTO {
    @IsString({message: "O nome deve ser um texto"})
    @IsNotEmpty({message: "O nome não pode ser vazio!"})
    @IsOptional()
    nome?: string

    @IsEmail()
    @IsOptional()
    email?: string

    @IsInt({message: "A idade deve ser um número inteiro"})
    @IsOptional()
    idade?: number
}