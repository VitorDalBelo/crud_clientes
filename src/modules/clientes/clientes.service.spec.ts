import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, QueryFailedError, Repository } from 'typeorm';
import { GetClienteDto } from './dto/get-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';


const clienteList: Cliente[] = [
  new Cliente({id:1,nome:"cliente1",email:"cliente1@gmail.com",dataNascimento:new Date("2002-04-02"),telefone:"11971432754",cpf:"14532647863"}),
  new Cliente({id:2,nome:"cliente2",email:"cliente2@gmail.com",dataNascimento:new Date("1998-02-20"),telefone:"11971782478",cpf:"78557412374"}),
  new Cliente({id:3,nome:"cliente3",email:"cliente3@gmail.com",dataNascimento:new Date("2000-12-16"),telefone:"11971479824",cpf:"74135879747"}),
]

const  queryFailedError : QueryFailedError<any> =   new QueryFailedError<any>(
    "query",
    [],
    { code: '23505' }
)



const clienteMock = new Cliente({id:1,nome:"cliente1",email:"cliente1@gmail.com",dataNascimento:new Date("2002-04-02"),telefone:"11971432754",cpf:"14532647863"});

const clienteCreated: GetClienteDto = {id:1,nome:"cliente",email:"cliente@gmail.com",dataNascimento:"2002-04-05",cpf:"78914798745",telefone:"11975358914"}

const deletedSuccessfully : DeleteResult = {
  raw:"teste",
  affected:1
}

const clienteToUpdate : UpdateClienteDto = {nome:"cliente1",email:"cliente1@hotmail.com",dataNascimento:"2002-04-06",cpf:"56414798745",telefone:"11924369874"}

const clienteToCreate: CreateClienteDto = {nome:"cliente",email:"cliente@gmail.com",dataNascimento:"2002-04-05",cpf:"78914798745",telefone:"11975358914"}


describe('ClientesService', () => {
  let service: ClientesService;
  let repository: Repository<Cliente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: getRepositoryToken(Cliente),
          useValue: {
            find: jest.fn().mockResolvedValue(clienteList),
            findOne: jest.fn().mockResolvedValue(clienteCreated),
            delete: jest.fn().mockResolvedValue(deletedSuccessfully),
            save: jest.fn().mockResolvedValue(clienteMock)
          },
        }
      ],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    repository = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a cliente entity list successfully', async () => {
      const result = await service.findAll();

      expect(result).toEqual(clienteList);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a cliente entity  successfully', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(clienteCreated);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      expect(service.findOne(1)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should return a DeleteResult entity  successfully', async () => {
      const result = await service.remove(1);

      expect(result).toEqual(deletedSuccessfully);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(new Error());

      expect(service.remove(1)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should return a cliente entity  successfully', async () => {
      const result = await service.update(1,clienteToUpdate);

      expect(result).toEqual(clienteMock);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      expect(service.update(1,clienteToUpdate)).rejects.toThrow();
    });

    it('should throw an NotFoundException', () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      expect(service.update(1,clienteToUpdate)).rejects.toThrow(NotFoundException);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.update(1,clienteToUpdate)).rejects.toThrow();
    });
  });
  describe('create', () => {
    it('should return a cliente entity  successfully', async () => {
      const result = await service.create(clienteToCreate);

      expect(result).toEqual(clienteMock);
    });


    it('should throw an exception', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.create(clienteToCreate)).rejects.toThrow();
    });

    it('should throw an ConflictException', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(queryFailedError);

      expect(service.create(clienteToCreate)).rejects.toThrow(ConflictException);
    });
  });
});
