import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  BadRequestException, 
  NotFoundException 
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { 
  BadRequest, 
  ClienteCreated, 
  Conflict, 
  GetCliente, 
  GetClientes, 
  InternalServerError, 
  NotFound 
} from '../../helpers/serverResponses';
import { GetClienteDto } from './dto/get-cliente.dto';

@ApiTags("clientes")
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @ApiResponse(InternalServerError)
  @ApiResponse(Conflict)
  @ApiResponse(BadRequest)
  @ApiResponse(ClienteCreated)
  @Post()
  async create(@Body() createClienteDto: CreateClienteDto){
    await CreateClienteDto.validate(createClienteDto);

    return await this.clientesService.create(createClienteDto);
  }

  @ApiResponse(InternalServerError)
  @ApiResponse(GetClientes)
  @Get()
  async findAll() {
    return await this.clientesService.findAll();
  }

  @ApiResponse(InternalServerError)
  @ApiResponse(NotFound)
  @ApiResponse(BadRequest)
  @ApiResponse(GetCliente)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if(!id || !(/^\d+$/.test(id))) throw new BadRequestException("Paremetro id inváido, deve-se passar um numero inteiro");
    const cliente = await this.clientesService.findOne(+id);
    if(!cliente) throw new NotFoundException("O id informado não corresponde ao id de nenhum cliente cadastrado");

    return cliente;
  }

  @ApiResponse(InternalServerError)
  @ApiResponse(BadRequest)
  @ApiResponse(GetCliente)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    if(!id || !(/^\d+$/.test(id))) throw new BadRequestException("Paremetro id inválido, deve-se passar um numero inteiro");
    await UpdateClienteDto.validate(updateClienteDto);
    return this.clientesService.update(+id, updateClienteDto);
  }

  @ApiResponse(InternalServerError)
  @ApiResponse(BadRequest)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if(!id || !(/^\d+$/.test(id))) throw new BadRequestException("Paremetro id inválido, deve-se passar um numero inteiro");
    this.clientesService.remove(+id);
    return true;
  }
}
