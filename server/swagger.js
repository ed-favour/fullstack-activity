const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Fullstack Todo app',
        version: '1.0.0',
        description: 'This is a simple API',
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Development server',
        },
      ],
      components: {
        schemas: {
          todo: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'This specifies the id of the task',
              },
              task: {
                type: 'string',
                description: 'It is the task on the todo list',
              },
              is_completed: {
                type: 'boolean',
                description: 'It checks if a task has been completed',
              },
              created_at: {
                type: 'timestamp',
                description: 'Timestamp for the created task',
              },
              updated_at: {
                type: 'timestamp',
                description: 'Timestamp for the updated task',
              },
            },
          },
        },
      },
      responses: {
        400: {
          description: 'Missing API key - included in the authorization area',
          content: 'application/json',
        },
        401: {
          description: 'Unauthorized - incorrect API keys or incorrect format',
          content: 'application/json',
        },
        404: {
          description: 'Not found',
          content: 'application/json',
        },
      },
    },
    apis: ['fullstack-activity/server/index.js'],
  };
  
  export default options;
  