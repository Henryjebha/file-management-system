# File Management System

A full-stack web application built with Django and React that allows users to upload, download, and manage files with a comprehensive dashboard and user profile management.

## Features

### Authentication
- User registration with email validation
- Secure login with JWT (JSON Web Token) authentication
- Protected routes for authenticated users only

### File Management
- Upload files with progress tracking
- View files in a clean tabular format with details (name, type, size, upload date)
- Download files by clicking on filenames
- Delete unwanted files

### Dashboard
- View total number of files uploaded
- See breakdown of file types (PDF, Excel, Word, Text)
- Monitor file upload statistics

### User Profile
- Update username
- Add and manage multiple addresses
- Add or update phone number
- Set default address

## Tech Stack

### Backend
- **Framework**: Django 4.2 with Django REST Framework
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: PostgreSQL
- **File Storage**: Local media storage

### Frontend
- **Framework**: React with TypeScript
- **State Management**: React Context API
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Charts**: Recharts for dashboard visualizations

## Project Structure

### Backend
```
backend/
├── filemanager/           # Main Django project
├── api/                   # API app for file and user management
├── authentication/        # Authentication app with JWT
├── media/                 # Uploaded files storage
├── requirements.txt       # Python dependencies
└── manage.py              # Django management script
```

### Frontend
```
frontend/
├── public/                # Static files
└── src/
    ├── components/        # UI components
    │   ├── Auth/          # Authentication components
    │   ├── Dashboard/     # Dashboard and stats
    │   ├── Files/         # File management
    │   ├── Layout/        # Layout components
    │   └── Profile/       # User profile management
    ├── contexts/          # React Context
    ├── services/          # API services
    ├── types/             # TypeScript interfaces
    └── utils/             # Helper functions
```

## Installation and Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/file-management-system.git
   cd file-management-system
   ```

2. Set up a virtual environment
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   SECRET_KEY=your_secret_key
   DEBUG=True
   DB_NAME=filemanager
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   ```

5. Set up the database
   ```bash
   python manage.py migrate
   ```

6. Create a superuser (admin)
   ```bash
   python manage.py createsuperuser
   ```

7. Run the development server
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start the development server
   ```bash
   npm start
   ```

## Usage

1. Access the application at `http://localhost:3000`
2. Register a new account or log in with existing credentials
3. Upload files through the Files page
4. View statistics on the Dashboard
5. Manage your profile information and addresses in the Profile section

## API Endpoints

### Authentication
- `POST /api/register/` - Register a new user
- `POST /api/token/` - Obtain JWT token
- `POST /api/token/refresh/` - Refresh JWT token

### File Management
- `GET /api/files/` - List all files
- `POST /api/files/` - Upload a file
- `GET /api/files/{id}/` - Retrieve file details
- `DELETE /api/files/{id}/` - Delete a file
- `GET /api/files/dashboard_stats/` - Get file statistics

### User Profile
- `GET /api/users/me/` - Get current user profile
- `PATCH /api/users/update_username/` - Update username
- `GET /api/addresses/` - List addresses
- `POST /api/addresses/` - Add new address
- `PUT /api/addresses/{id}/` - Update address
- `DELETE /api/addresses/{id}/` - Delete address
- `PATCH /api/profiles/update_phone/` - Update phone number

## Submission Guidelines

This project was completed according to the following assignment requirements:

### Option 3: Web Application with Django & ReactJS
- **Authentication**: Implemented login page with email/password authentication and validation
- **File Management**: Created functionality for users to upload files, view them in a table with details, and download by clicking on filenames
- **Dashboard**: Implemented display of total files uploaded, breakdown of file types, and files uploaded by each user
- **User Profile**: Added ability to edit username, manage multiple addresses, and add/edit phone numbers

### Tech Stack Used
- **Frontend**: React with TypeScript and TailwindCSS
- **Backend**: Django with Django REST Framework
- **Database**: PostgreSQL

## Future Enhancements

- File sharing capabilities
- Advanced search and filtering
- File preview for common formats
- Cloud storage integration
- User activity logs
- Dark mode support
