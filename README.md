# LeadTap Properties – Backend Developer Assessment

## Project Overview

LeadTap Properties is a full-stack property management application developed as part of a Backend Developer Assessment. The project demonstrates a Headless WordPress CMS integrated with a Node.js + TypeScript backend, React.js frontend and admin panel, and MongoDB Atlas for lead management.

The application retrieves property data from WordPress using WPGraphQL, exposes optimized REST APIs, supports secure JWT authentication, validates user enquiries, stores leads in MongoDB Atlas, and sends email notifications using Mailtrap SMTP.

---

## Technology Stack

### Frontend
- React.js
- Vite
- Bootstrap 5

### Backend
- Node.js
- Express.js
- TypeScript

### CMS
- WordPress Headless CMS
- WPGraphQL
- Advanced Custom Fields (ACF)

### Database
- MySQL (WordPress)
- MongoDB Atlas (Lead Storage)

### Cache 
- Redis Cache
  - https://leadtap-properties.onrender.com/api/redis/test - Redis status
    
### Authentication
- JWT (JSON Web Token)

### Email Service
- Nodemailer
- Mailtrap SMTP

### Documentation
- Swagger (OpenAPI)

### Deployment
- Render (Backend)
- Vercel (Frontend & Admin)

---

## Features

- Headless WordPress CMS Integration
- Property Listing & Property Details
- Property Search & Filters
- REST API Development
- JWT Authentication
- Lead Submission
- MongoDB Atlas Integration
- Email Notifications using Mailtrap SMTP
- Swagger API Documentation
- CRM Webhook
- Input Validation
- Helmet Security
- CORS Protection
- Rate Limiting
- Automatic GitHub Deployment

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Retrieve all properties |
| GET | `/api/properties/:slug` | Retrieve property details |
| GET | `/api/taxonomies` | Retrieve property filters |
| POST | `/api/leads` | Submit property enquiry |
| POST | `/api/admin/login` | Admin authentication |
| GET | `/api/admin/dashboard` | View submitted leads |
| POST | `/api/webhook/crm` | CRM webhook |
| GET | `/health` | Health check |
| GET | `/api-docs` | Swagger documentation |

---

## Live URLs

**Frontend**
- https://leadtap-frontend-chi.vercel.app/

**Admin Panel**
- https://leadtap-admin.vercel.app/login

**Backend API**
- https://leadtap-properties.onrender.com/

**Swagger**
- https://leadtap-properties.onrender.com/api-docs

---

## Assessment Highlights

- Headless CMS architecture using WordPress & WPGraphQL
- Scalable REST APIs with Node.js & TypeScript
- Secure JWT authentication
- MongoDB Atlas integration for lead management
- Property search and filtering
- Email notifications using Mailtrap SMTP
- Swagger API documentation
- Cloud deployment with Render and Vercel
- GitHub CI/CD integration

---

## Author

**Rooban Sivachakravarthi**
