import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import handleDtoError from "../../../helpers/handleDtoError";
import * as Yup from 'yup';

export class CreateClienteDto {
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

    private static schema = Yup.object().shape({
        nome: Yup.string().required('O campo nome é obrigatório'),
        email: Yup.string()
        .required('O campo email é obrigatório')
        .email('O email precisa ser válido'),
        dataNascimento: Yup.string()
        .required('O campo dataNascimento é obrigatório')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'O campo dataNascimento deve estar no formato YYYY-MM-DD'),
        telefone: Yup.string()
        .max(20, 'O campo telefone deve ter no máximo 20 caracteres')
        .matches(/^[0-9]*$/, 'O campo telefone deve conter apenas números'),
        cpf: Yup.string()
        .length(11, 'O campo cpf deve ter 11 caracteres')
        .matches(/^[0-9]*$/, 'O campo cpf deve conter apenas números')
        .required('O campo cpf é obrigatório')
    });

    public static async validate(value: any,options?: Yup.ValidateOptions<Yup.AnyObject>) : Promise<Partial<CreateClienteDto>>{
        return CreateClienteDto.schema.validate(value,options)
        .catch(handleDtoError)
    }

}
