# taskmaster
Full-stack JavaScript task manager | Node.js + Express REST API + React frontend + SQLite database
# Task Manager API & Dashboard

A full-stack task management application with RESTful API and interactive web interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## Features

- ✅ Create, read, update, and delete tasks
- 🏷️ Task categorization and priority levels
- 📊 Task statistics and filtering
- 🔍 Search functionality
- 💾 SQLite database with migrations
- 🧪 Comprehensive test suite
- 📝 API documentation

## Tech Stack

**Backend:**
- Node.js + Express
- SQLite3
- Jest for testing

**Frontend:**
- React 18
- Tailwind CSS
- Axios for API calls

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/task-manager.git
cd task-manager

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

```bash
# Start backend (from backend directory)
npm run dev
# API runs on http://localhost:3001

# Start frontend (from frontend directory)
npm start
# App runs on http://localhost:3000
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## API Documentation

### Endpoints

#### Tasks

**GET /api/tasks**
- Get all tasks
- Query params: `status`, `priority`, `search`

**GET /api/tasks/:id**
- Get single task

**POST /api/tasks**
- Create new task
- Body: `{ title, description, priority, status, category }`

**PUT /api/tasks/:id**
- Update task
- Body: `{ title?, description?, priority?, status?, category? }`

**DELETE /api/tasks/:id**
- Delete task

**GET /api/tasks/stats**
- Get task statistics

## Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── db/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Environment Variables

Create `.env` files:

**Backend (.env):**
```
PORT=3001
NODE_ENV=development
DB_PATH=./data/tasks.db
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:3001
```

## Future Enhancements

- [ ] User authentication with JWT
- [ ] Task due dates and reminders
- [ ] Task assignments and collaboration
- [ ] File attachments
- [ ] Email notifications
- [ ] Dark mode

## License

MIT License - feel free to use this project for learning and portfolio purposes.

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## Contact

Raul Latorre - 

Project Link: [https://github.com/yourusername/task-manager](https://github.com/yourusername/task-manager)
