import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { GetClienteDto } from './dto/get-cliente.dto';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateClienteDto } from './dto/update-cliente.dto';

const clienteList: Cliente[] = [
  new Cliente({id:1,nome:"cliente1",email:"cliente1@gmail.com",dataNascimento:new Date("2002-04-02"),telefone:"11971432754",cpf:"14532647863"}),
  new Cliente({id:2,nome:"cliente2",email:"cliente2@gmail.com",dataNascimento:new Date("1998-02-20"),telefone:"11971782478",cpf:"78557412374"}),
  new Cliente({id:3,nome:"cliente3",email:"cliente3@gmail.com",dataNascimento:new Date("2000-12-16"),telefone:"11971479824",cpf:"74135879747"}),
]

const clienteCreated: GetClienteDto = {id:1,nome:"cliente",email:"cliente@gmail.com",dataNascimento:"2002-04-05",cpf:"78914798745",telefone:"11975358914"}
const clienteToCreate: CreateClienteDto = {nome:"cliente",email:"cliente@gmail.com",dataNascimento:"2002-04-05",cpf:"78914798745",telefone:"11975358914"}
const clienteToUpdate : UpdateClienteDto = {nome:"cliente1",email:"cliente1@hotmail.com",dataNascimento:"2002-04-06",cpf:"56414798745",telefone:"11924369874"}


describe('ClientesController', () => {
  let controller: ClientesController;
  let service: ClientesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [{
        provide:ClientesService,
        useValue:{
          create: jest.fn().mockResolvedValue(clienteCreated),
          findAll: jest.fn().mockResolvedValue(clienteList),
          findOne: jest.fn().mockResolvedValue(clienteCreated),
          remove: jest.fn().mockResolvedValue(null),
          update:jest.fn().mockResolvedValue(clienteToUpdate)
        }
      }],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
  describe('create',()=>{
    it('should throw BadRequestException if a required field is missing', async ()=>{
      const {nome, ...clienteToCreateWithoutNome} = clienteToCreate;
      await expect(controller.create(clienteToCreateWithoutNome as CreateClienteDto))
      .rejects.toThrow(BadRequestException);

      const {email, ...clienteToCreateWithoutEmail} = clienteToCreate;
      await expect(controller.create(clienteToCreateWithoutEmail as CreateClienteDto))
      .rejects.toThrow(BadRequestException);

      const {dataNascimento, ...clienteToCreateWithoutDataNasc} = clienteToCreate;
      await expect(controller.create(clienteToCreateWithoutDataNasc as CreateClienteDto))
      .rejects.toThrow(BadRequestException);
      const {cpf, ...clienteToCreateWithoutCpf} = clienteToCreate;
      await expect(controller.create(clienteToCreateWithoutCpf as CreateClienteDto))
      .rejects.toThrow(BadRequestException);
    })
    it('should return ClienteDto even if an optional field is missing', async ()=>{
      const { telefone, ...clienteWithoutTelefone } = clienteToCreate;
      const result = await controller.create(clienteWithoutTelefone);
      expect(result).toEqual(clienteCreated);
    })
    it('should return ClienteDto if all fields are filled in correctly ', async ()=>{
      const result = await controller.create(clienteToCreate);
      expect(result).toEqual(clienteCreated);
    })
  })

  
  describe('findAll',()=>{
    it('should return a cliente list', async ()=>{
      const result = await controller.findAll();

      expect(result).toEqual(clienteList)
    })
  })

  describe('findOne',()=>{
    it('should throws BadRequestException if a non-numeric value is passed in the id parameter', async ()=>{
      await expect(controller.findOne("valorInvalido"))
      .rejects.toThrow(BadRequestException);
    })
    it('should throws NotFoundException if a non-numeric value is passed in the id parameter', async ()=>{
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);
      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    })   
    it('should return a cliente', async ()=>{
      const result = await controller.findOne('1');

      expect(result).toEqual(clienteCreated)
    })
  })

  describe('update',()=>{
    it('should throws BadRequestException if a non-numeric value is passed in the id parameter', async ()=>{
      await expect(controller.update("valorInvalido",clienteToUpdate))
      .rejects.toThrow(BadRequestException);
    })
  
    it('should return a cliente', async ()=>{
      let result = await controller.update('1',clienteToUpdate);
      expect(result).toEqual(clienteToUpdate)
      const {nome, ...clienteToUpdateWithoutNome} = clienteToUpdate;
      result = await controller.update('1',clienteToUpdateWithoutNome);
      expect(result).toEqual(clienteToUpdate)
      const {email, ...clienteToUpdateWithoutEmail} = clienteToUpdate;
      result = await controller.update('1',clienteToUpdateWithoutEmail);
      expect(result).toEqual(clienteToUpdate)
      const {dataNascimento, ...clienteToUpdateWithoutDataNasc} = clienteToUpdate;
      result = await controller.update('1',clienteToUpdateWithoutDataNasc);
      expect(result).toEqual(clienteToUpdate)
      const {telefone, ...clienteToUpdateWithoutTelefone} = clienteToUpdate;
      result = await controller.update('1',clienteToUpdateWithoutTelefone);
      expect(result).toEqual(clienteToUpdate)
      const {cpf, ...clienteToUpdateWithoutCpf} = clienteToUpdate;
      result = await controller.update('1',clienteToUpdateWithoutCpf);
      expect(result).toEqual(clienteToUpdate)
    })
  })

  describe('remove',()=>{
    it('should throw BadRequestException and return 400 status code if a non-numeric value is passed in the id parameter', async ()=>{
      try {
        await controller.remove("abc");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.statusCode).toEqual(400);
      }
    })
    it('should return true', async ()=>{
      const result = await controller.remove("1") as any;
      expect(result).toEqual(true)

    })
  })
  
});
