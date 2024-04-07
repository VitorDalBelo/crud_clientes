import { GetClienteDto } from "../modules/clientes/dto/get-cliente.dto";


export const GetCliente = {
  status: 200,
  description: 'Consultar Clientes',
  type: GetClienteDto
}
export const ClienteCreated = {
  status: 201,
  description: 'Cliente Cadastrado',
  type:GetClienteDto
}
export const GetClientes = {
    status: 200,
    description: 'Consultar Clientes',
    type: GetClienteDto,
    isArray:true
}

export const Ok = {
  status: 200,
  description: 'Ok',
  
}

export const ServiceUnavailable = {
  status: 503,
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 503
          },
          message: {
            type: 'string',
            example: 'service unavailable'
          }
        }
      }
    }
  }
}

export const BadRequest = {
    status: 400,
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number',
              example: 400
            },
            message: {
              type: 'string',
              example: 'Campo xpto está inválido'
            },
            error: {
              type: 'string',
              example: 'Bad Request'
            }
          }
        }
      }
    }
  }

export const Conflict = {
  status: 409,
  description: 'Conflict',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 409
          },
          message: {
            type: 'string',
            example: 'Já existe um cliente com este email.'
          },
          error: {
            type: 'string',
            example: 'Conflict'
          }
        }
      }
    }
  }
}

export const NotFound = {
  status: 404,
  description: 'Not Found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 404
          },
          message: {
            type: 'string',
            example: "O id informado não corresponde ao id de nenhum cliente cadastrado"
          },
          error: {
            type: 'string',
            example: "Not Found"
          }
        }
      }
    }
  }
}

export const InternalServerError = {
  status: 500,
  description: 'Internal server error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 500
          },
          message: {
            type: 'string',
            example: 'Internal server error'
          }
        }
      }
    }
  }
}