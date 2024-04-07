import { ApiProperty,ApiPropertyOptional } from "@nestjs/swagger";

export class GetClienteDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nome: string;
    @ApiProperty()
    email: string;
    @ApiProperty({ type: 'string', format: 'date' })
    dataNascimento: string;
    @ApiPropertyOptional()
    telefone?: string;
    @ApiProperty()
    cpf: string;
}