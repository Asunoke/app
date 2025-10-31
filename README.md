# 🚗 JigiFuel

JigiFuel is a free web application that helps users find nearby fuel stations in Bamako, Mali and reserve digital tickets to avoid long queues.

## 🎯 Features

- **Interactive Map**: View all fuel stations on a map with real-time status (open/closed)
- **Digital Tickets**: Reserve tickets for fuel stations to skip the line
- **User Authentication**: Secure login and registration with Better Auth
- **Role-Based Access**: Different dashboards for users, managers, and admins
- **Ticket Management**: View, cancel, and track your tickets
- **Admin Dashboard**: Manage stations, users, and validate tickets
- **Manager Dashboard**: Validate tickets for assigned stations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth (JWT sessions)
- **Maps**: Leaflet & React-Leaflet
- **Notifications**: React Hot Toast
- **Validation**: Zod

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud like NeonDB)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/jigifuel?schema=public"
BETTER_AUTH_SECRET="your-secret-key-here-change-in-production"
BETTER_AUTH_URL="http://localhost:3000"
```

For production (Vercel + NeonDB):
```env
DATABASE_URL="your-neondb-connection-string"
BETTER_AUTH_SECRET="your-production-secret-key"
BETTER_AUTH_URL="https://your-domain.vercel.app"
```

4. **Set up the database**

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample stations
npm run db:seed
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Better Auth endpoints
│   │   ├── stations/     # Station CRUD
│   │   ├── tickets/      # Ticket management
│   │   └── users/        # User management
│   ├── dashboard/        # Admin/Manager dashboard
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── tickets/          # User tickets page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page (map)
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── badge.tsx
│   ├── map.tsx           # Leaflet map component
│   └── navbar.tsx        # Navigation bar
├── lib/
│   ├── prisma.ts         # Prisma client
│   └── auth-client.ts    # Better Auth client
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── types/
│   └── auth.ts           # TypeScript types
└── auth.ts               # Better Auth config
```

## 👥 User Roles

### USER (Default)
- View stations on map
- Reserve tickets
- View and cancel own tickets

### MANAGER
- All USER permissions
- Validate/reject tickets for assigned station
- View tickets for their station

### ADMIN
- All MANAGER permissions
- Create and manage stations
- Assign managers to stations
- View all users and tickets

## 🗺️ Creating Your First Admin User

After seeding the database, you'll need to manually update a user to ADMIN role:

1. Register a new account at `/register`
2. Connect to your database and run:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## 🎨 Theme Colors

- **Primary Orange**: `#FF7A00`
- **Dark Gray**: `#1A1A1A`
- **Background**: `#F5F5F5`
- **Success**: `#10B981`
- **Error**: `#EF4444`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-out` - Logout

### Stations
- `GET /api/stations` - Get all stations
- `POST /api/stations` - Create station (Admin only)

### Tickets
- `GET /api/tickets` - Get user's tickets
- `POST /api/tickets` - Create new ticket
- `DELETE /api/tickets/[id]` - Cancel ticket
- `POST /api/tickets/validate` - Validate ticket (Manager/Admin)

### Users
- `GET /api/users` - Get all users (Admin only)

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Setup (NeonDB)

1. Create a new project at [neon.tech](https://neon.tech)
2. Copy the connection string
3. Add to Vercel environment variables
4. Run migrations: `npm run db:push`
5. Seed database: `npm run db:seed`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ for the people of Mali
