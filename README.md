# ZenDoc Backend

A comprehensive healthcare management system API that facilitates medical appointments, patient management, and healthcare service delivery. Built with modern technologies and following industry best practices.

## Live site: [Zen doc](https://zendoc-frontend.vercel.app/)

## 🏥 Overview

ZenDoc Backend is a robust healthcare technology platform that connects patients with healthcare providers through a digital appointment booking and management system. The platform supports multi-role user management, comprehensive medical record keeping, and integrated payment processing.

## ✨ Key Features

- **Multi-Role User Management**: Super Admin, Admin, Doctor, and Patient roles with role-based access control
- **Appointment System**: Complete scheduling, booking, and management of medical appointments
- **Doctor Management**: Profile management, specialties, schedules, and availability tracking
- **Patient Care**: Health records, prescriptions, medical reports, and patient reviews
- **Payment Integration**: SSL Commerce payment gateway integration for secure transactions
- **File Management**: Cloudinary integration for profile photos and medical documents
- **Email Notifications**: Automated email system for appointment confirmations and updates

## 🛠 Technology Stack

### Core Technologies
- **Runtime**: Node.js with TypeScript (strict mode)
- **Framework**: Express.js with async/await patterns
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with role-based access control
- **File Upload**: Multer + Cloudinary integration
- **Payment**: SSL Commerce Gateway
- **Email**: Nodemailer for transactional emails
- **Validation**: Zod schemas for all inputs
- **Security**: bcrypt for password hashing
- **Testing**: Vitest with comprehensive test coverage

### Development Tools
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier with pre-commit hooks
- **Git Hooks**: Husky for automated code quality checks
- **Type Checking**: Strict TypeScript configuration
- **Database Management**: Prisma CLI for migrations and schema management

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zihad550/zendoc-backend
   cd zendoc-backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**

   - Create a `.env` file in the root directory and copy the content of `.env.example`


4. **Database Setup**
   ```bash
   # Generate Prisma client
   pnpm db:generate

   # Run database migrations
   pnpm db:migrate
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

The server will start on `http://localhost:8000`

## 📝 Available Scripts

### Development
```bash
pnpm dev              # Start development server with hot reload
pnpm build            # Build TypeScript to JavaScript
pnpm start            # Start production server
```

### Database Management
```bash
pnpm db:generate      # Generate Prisma client after schema changes
pnpm db:migrate       # Apply database migrations
pnpm db:deploy        # Deploy migrations to production
pnpm db:studio        # Open Prisma Studio for database management
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting
pnpm type:check       # Run TypeScript type checking
```

## 🏗 Project Structure

```
src/
├── app/
│   ├── config/           # Environment configuration
│   ├── database/         # Prisma client setup
│   ├── errors/           # Custom error classes
│   ├── interfaces/       # TypeScript interfaces
│   ├── middlewares/      # Express middlewares
│   ├── modules/          # Feature modules (MVC pattern)
│   │   ├── admin/        # Admin management
│   │   ├── appointment/  # Appointment system
│   │   ├── auth/         # Authentication
│   │   ├── doctor/       # Doctor management
│   │   ├── patient/      # Patient management
│   │   ├── payment/      # Payment processing
│   │   ├── prescription/ # Prescription management
│   │   ├── review/       # Review system
│   │   └── ...          # Other modules
│   ├── routes/           # Route aggregation
│   └── utils/            # Shared utilities
├── app.ts               # Express app configuration
└── server.ts            # Server startup
```

## 🔐 Authentication & Authorization

The system implements JWT-based authentication with role-based access control:

- **Super Admin**: Full system access and management
- **Admin**: Administrative functions and user management
- **Doctor**: Medical practice management and patient interaction
- **Patient**: Personal health records and appointment booking

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key entities include:

- **Users**: Base user authentication and role management
- **Doctors**: Medical professional profiles and specialties
- **Patients**: Patient profiles and health data
- **Appointments**: Scheduling and booking system
- **Prescriptions**: Medical prescriptions and follow-ups
- **Payments**: Transaction management
- **Reviews**: Patient feedback system

## 🔧 API Documentation

### Base URL
- Development: `http://localhost:8000/api/v1`
- Production: `https://your-domain.com/api/v1`

### Key Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password

#### User Management
- `POST /user/create-admin` - Create admin user
- `POST /user/create-doctor` - Create doctor user
- `POST /user/create-patient` - Create patient user
- `GET /user/profile` - Get user profile
- `PATCH /user/profile` - Update user profile

#### Appointments
- `POST /appointment` - Book appointment
- `GET /appointment` - Get appointments
- `PATCH /appointment/:id` - Update appointment
- `DELETE /appointment/:id` - Cancel appointment

#### Doctors
- `GET /doctor` - Get doctors list
- `GET /doctor/:id` - Get doctor details
- `PATCH /doctor/:id` - Update doctor profile
- `GET /doctor/:id/schedules` - Get doctor schedules

#### Patients
- `GET /patient` - Get patients list
- `GET /patient/:id` - Get patient details
- `PATCH /patient/:id` - Update patient profile

## 🚀 Deployment

### Vercel Deployment

The project is configured for Vercel deployment:

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

### Environment Variables

Ensure all required environment variables are configured in your deployment platform.

### Database Migration

For production deployment:
```bash
pnpm db:deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript strict mode guidelines
- Use ESLint and Prettier configurations
- Follow the existing project structure and naming conventions

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation and examples

## 🔗 Related Links

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [SSL Commerce Documentation](https://developer.sslcommerz.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

Built with ❤️ for better healthcare management
