import { IsEmail, IsInt, isInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUsuarioDTO {
    @IsString({message: "O nome deve ser um texto"})
    @IsNotEmpty({message: "O nome é obrigatório!"})
    nome: string

    @IsEmail()
    email: string
    
    @IsInt({message: "A idade deve ser um número inteiro!"})
    @IsOptional()
    idade?: number
}