const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'ASTU-MSJ Bootcamp Management System API',
      version: '1.0.0',
      description:
        'REST API for managing bootcamp authentication, users, batches, attendance, progress, assignments, submissions, announcements, and dashboards.',
    },

    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local development server',
      },
    ],

    tags: [
      { name: 'Authentication', description: 'Authentication and password management' },
      { name: 'Users', description: 'User management and profiles' },
      { name: 'Batches', description: 'Bootcamp batch and roster management' },
      { name: 'Attendance', description: 'Student attendance management' },
      { name: 'Progress', description: 'Student learning progress tracking' },
      { name: 'Assignments', description: 'Assignment management' },
      { name: 'Submissions', description: 'Assignment submission and grading workflow' },
      { name: 'Announcements', description: 'Bootcamp announcements' },
      { name: 'Dashboards', description: 'Role-based dashboards' },
      { name: 'System', description: 'System health' },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token returned by login.',
        },
      },

      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Something went wrong',
            },
          },
        },

        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:
              {
                type: 'string',
                format: 'email',
                example: 'student@example.com',
              },
            password: {
              type: 'string',
              example: 'Password123!',
            },
          },
        },

        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              example: 'Showcase Student',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'student@example.com',
            },
            password: {
              type: 'string',
              example: 'Password123!',
            },
          },
        },

        Batch: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Full Stack Cohort 2026',
            },
            description: {
              type: 'string',
              example: 'ASTU Full Stack Development Bootcamp',
            },
            startDate: {
              type: 'string',
              format: 'date-time',
            },
            endDate: {
              type: 'string',
              format: 'date-time',
            },
          },
        },

        Attendance: {
          type: 'object',
          properties: {
            studentId: {
              type: 'string',
              example: '65f1a2b3c4d5e6f7a8b9c0d2',
            },
            batchId: {
              type: 'string',
              example: '65f1a2b3c4d5e6f7a8b9c0d0',
            },
            date: {
              type: 'string',
              format: 'date-time',
            },
            status: {
              type: 'string',
              enum: ['PRESENT', 'LATE', 'ABSENT', 'EXCUSED'],
              example: 'PRESENT',
            },
            note: {
              type: 'string',
              example: 'Participated actively',
            },
          },
        },

        Progress: {
          type: 'object',
          properties: {
            studentId: {
              type: 'string',
            },
            batchId: {
              type: 'string',
            },
            topic: {
              type: 'string',
              example: 'NODEJS',
            },
            status: {
              type: 'string',
              example: 'IN_PROGRESS',
            },
            notes: {
              type: 'string',
              example: 'Working on backend fundamentals',
            },
          },
        },

        Assignment: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'REST API Architecture',
            },
            description: {
              type: 'string',
              example: 'Build a secure REST API',
            },
            instructions: {
              type: 'string',
              example: 'Implement authentication and RBAC',
            },
            batchId: {
              type: 'string',
            },
            deadline: {
              type: 'string',
              format: 'date-time',
            },
            maximumScore: {
              type: 'number',
              example: 100,
            },
          },
        },

        Submission: {
          type: 'object',
          properties: {
            assignmentId: {
              type: 'string',
            },
            githubUrl: {
              type: 'string',
              format: 'uri',
              example: 'https://github.com/student/backend-project',
            },
            liveDemoUrl: {
              type: 'string',
              format: 'uri',
              example: 'https://example.com',
            },
            notes: {
              type: 'string',
            },
          },
        },
      },
    },
  },

  apis: ['./src/docs/swagger.docs.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;