import * as Yup from 'yup';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export default function(err:any) : any{
    if (err instanceof Yup.ValidationError) throw new BadRequestException(err.errors[0]);
    else throw new InternalServerErrorException('Ocorreu um erro inesperado.')
}