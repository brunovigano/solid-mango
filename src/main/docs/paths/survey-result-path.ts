export const surveyResultPath = {
  put: {
    security: [{ apiKeyAuth: [] }],
    tags: ['Enquete'],
    summary: 'Criar nova resposta para enquete',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveSurveyParams',
          },
        },
      },
    },
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        description: 'ID da enquete a ser respondida',
        required: 'true',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult',
            },
          },
        },
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  get: {
    security: [{ apiKeyAuth: [] }],
    tags: ['Enquete'],
    summary: 'Consultar o resultado de uma enquete',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        description: 'ID da enquete a ser respondida',
        required: 'true',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult',
            },
          },
        },
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
}
