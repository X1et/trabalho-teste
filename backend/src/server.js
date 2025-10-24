const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Importação das rotas
const authRoutes = require('./routes/auth');
const equipmentRoutes = require('./routes/equipment');
const userRoutes = require('./routes/users');

// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Equipamentos',
      version: '1.0.0',
      description: 'API para gerenciamento de inventário de equipamentos',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/users', userRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API de Gestão de Equipamentos funcionando!' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;