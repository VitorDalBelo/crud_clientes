import * as Yup from 'yup';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import handleDtoError from '../../../helpers/handleDtoError';

export class UpdateClienteDto {
    @ApiPropertyOptional()
    nome?: string;
    @ApiPropertyOptional()
    email?: string;
    @ApiPropertyOptional({ type: 'string', format: 'date' })
    dataNascimento?: string;
    @ApiPropertyOptional()
    telefone?: string;
    @ApiPropertyOptional()
    cpf?: string;

    private static schema = Yup.object().shape({
        email: Yup.string()
        .email('O email precisa ser válido'),
        dataNascimento: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'O campo dataNascimento deve estar no formato YYYY-MM-DD'),
        telefone: Yup.string()
        .max(20, 'O campo telefone deve ter no máximo 20 caracteres')
        .matches(/^[0-9]*$/, 'O campo telefone deve conter apenas números'),
        cpf: Yup.string()
        .length(11, 'O campo cpf deve ter 11 caracteres')
        .matches(/^[0-9]*$/, 'O campo cpf deve conter apenas números')
    });

    public static async validate(value: any,options?: Yup.ValidateOptions<Yup.AnyObject>) : Promise<Partial<UpdateClienteDto>>{
        return UpdateClienteDto.schema.validate(value,options)
        .catch(handleDtoError)
    }

}
