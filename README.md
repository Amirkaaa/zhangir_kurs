# Digital Eye - Backend

Backend side of project. Execute, store, calculate data 
and communicate between all project components.
In every directory of project contains README.md file for description functionality of module.


### Architecture
- MongoDB
- Node
- Express
 

### Protocols
- HTTP REST API
- WebSocket


### Notes
- Node has been enabled "module" type, [read here](https://nodejs.org/api/modules.html).
- HTTP REST API Client documentation (Insomnia like POSTMAN) located at root of project. 
File was created for developers.
- WebSocket examples demonstrated in HTML files located at `/src/sockets/*.html`.  
- Express contains minimal dependencies for backend
    - "agenda": "^3.0.0" - For scheduled task like close registration for exam.
    - "cors": "^2.8.5" - Security middleware for aware of attacks like CSRF. 
    - "mongoose": "^5.8.11" - Lightweight library for MongoDB on Node.
    - "morgan": "^1.9.1" - Logging tool.
    - "multer": "^1.4.2" - Documents upload tool for Express
    - "socket.io": "^2.3.0" - WebSocket library
    