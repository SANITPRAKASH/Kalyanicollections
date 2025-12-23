# Kalyani Collections - Boutique Store Application

A modern Next.js 14 boutique e-commerce application for "Kalyani Collections" - an online catalog for authentic Indian wear without transactions/delivery. Focus on product showcase, user authentication, and appointment booking.

## Features

### 🛍️ Product Management
- Beautiful product catalog with categories and subcategories
- Advanced filtering and search functionality
- Product detail pages with image galleries
- Featured products and collections

### 🔐 Authentication System
- JWT + Email OTP (2-factor authentication)
- Secure user registration and login
- Protected routes and middleware
- User profile management

### 📱 User Experience
- Responsive design for all devices
- Modern UI with boutique theme
- Shopping cart (wishlist style)
- Appointment booking system

### 🎨 Design System
- Custom Tailwind CSS theme with boutique colors
- Glassmorphism and neumorphic design elements
- Smooth animations and transitions
- Accessible and user-friendly interface

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS v4 with custom theme
- **Authentication**: JWT + Email OTP
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Radix UI primitives
- **State Management**: Zustand
- **Email Service**: Nodemailer
- **Image Handling**: Next.js Image optimization

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Email service (Gmail/SMTP)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pkexpressions
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Update the `.env` file with your database and email configuration:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/pkexpressions"
JWT_SECRET="kalyani-house-secret-2025-super-secure"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (shop)/            # Product pages
│   ├── (user)/            # User dashboard pages
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── product/          # Product-related components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database client
│   ├── email.ts          # Email service
│   └── utils.ts          # General utilities
├── stores/               # Zustand state management
└── types/                # TypeScript type definitions
```

## Key Features Implementation

### Authentication Flow
1. User registers/logs in with email and password
2. System generates and sends OTP to email
3. User verifies OTP
4. JWT token is issued and stored
5. Protected routes are accessible

### Product Catalog
- Category-based navigation with dropdown menus
- Advanced filtering by category, price, colors
- Search functionality
- Grid and list view modes
- Product detail pages with image galleries

### Shopping Cart
- Add products to cart (wishlist style)
- Persistent cart storage
- Cart management in user dashboard
- No checkout process (catalog only)

### Appointment Booking
- Contact form for general inquiries
- Appointment booking system
- Email notifications
- Admin panel for managing bookings

## Admin Panel

The admin panel provides:
- Product management (CRUD operations)
- Category and subcategory management
- User management
- Booking and inquiry management
- Analytics dashboard

Access: `/admin` (requires admin role)

## Deployment

### Environment Setup
1. Set up PostgreSQL database
2. Configure email service
3. Set environment variables
4. Run database migrations

### Build and Deploy
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email info@kalyanicollections.com or create an issue in the repository.

---

Built with ❤️ for Pushkara Expressions