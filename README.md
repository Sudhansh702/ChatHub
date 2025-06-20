/chat-app
├── /backend
│   ├── /src
│   │   ├── /config         ← DB & Socket config
│   │   ├── /controllers    ← Auth, Message logic
│   │   ├── /models         ← Sequelize models
│   │   ├── /routes         ← Auth & Chat routes
│   │   ├── /middlewares    ← JWT auth, error handler
│   │   ├── /utils          ← Helper functions
│   │   ├── app.js          ← Express app
│   │   ├── socket.js       ← Socket.IO setup
│   │   └── server.js       ← Entry point
├── docker-compose.yml
|── .env
|
├── /frontend
│   ├── /public
│   ├── /src
│   │    ├── /components
│   │    ├── /pages
│   │    ├── /services (API calls, socket service)
│   │    ├── /styles
│   │    ├── App.jsx
│   │    └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── tailwind.config.js
│
├── docker-compose.yml
└── README.md
