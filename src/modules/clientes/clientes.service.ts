import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository : Repository<Cliente>
  ){}
  async create(clienteDto: CreateClienteDto ) : Promise<Cliente>{
    
    return await this.clienteRepository.save(clienteDto)
    .then(novoCliente=>novoCliente)
    .catch(error=>{
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('Já existe um cliente com este email.');
      } 
      else throw error;
    })
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findOne(id: number) {
    return await this.clienteRepository.findOne({where:{id}});
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findOne({where:{id}});
    if (!cliente) throw new NotFoundException("O id informado não corresponde ao id de nenhum cliente cadastrado");
    Object.assign(cliente, updateClienteDto);
  
    return await this.clienteRepository.save(cliente);
  }

  async remove(id: number) {
    return await this.clienteRepository.delete(id) ;
  }
}
