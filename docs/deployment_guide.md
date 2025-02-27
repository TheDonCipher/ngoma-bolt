# Ngoma Deployment Guide

This guide provides comprehensive instructions for deploying the Ngoma music platform in various environments.

## Prerequisites

Before deploying Ngoma, ensure you have:

- Node.js v16+ and npm v8+
- PostgreSQL v13+
- Git
- Docker and Docker Compose (for containerized deployment)
- Access to cloud provider (for production deployment)
- Domain name and SSL certificate (for production)

## Environment Configuration

### Environment Variables

Create `.env` files for both frontend and backend:

#### Backend `.env` Example

```
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/ngoma_db

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRATION=1d

# Web3 Configuration
WEB3_PROVIDER_URL=https://polygon-mainnet.g.alchemy.com/v2/your_key
NFT_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890

# Server Configuration
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

#### Frontend `.env.local` Example

```
# API Configuration
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# Web3 Configuration
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_NETWORK_ID=137
```

### Database Setup

1. Create a PostgreSQL database:

   ```sql
   CREATE DATABASE ngoma_db;
   CREATE USER ngoma_user WITH ENCRYPTED PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE ngoma_db TO ngoma_user;
   ```

2. Run database migrations:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

## Development Deployment

For local development and testing:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-org/ngoma-bolt.git
   cd ngoma-bolt
   ```

2. **Install dependencies:**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Run the development servers:**

   ```bash
   # Backend (in one terminal)
   cd backend
   npm run start:dev

   # Frontend (in another terminal)
   cd frontend
   npm run dev
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - API Documentation: http://localhost:4000/api

## Production Deployment

### Containerized Deployment (Docker)

1. **Build Docker images:**

   ```bash
   # From project root
   docker build -t ngoma-backend -f backend/Dockerfile ./backend
   docker build -t ngoma-frontend -f frontend/Dockerfile ./frontend
   ```

2. **Use Docker Compose:**
   Create a `docker-compose.yml` file:

   ```yaml
   version: '3'
   services:
     db:
       image: postgres:13
       volumes:
         - postgres_data:/var/lib/postgresql/data
       environment:
         POSTGRES_PASSWORD: your_db_password
         POSTGRES_USER: ngoma_user
         POSTGRES_DB: ngoma_db
       restart: always

     backend:
       image: ngoma-backend
       depends_on:
         - db
       environment:
         DATABASE_URL: postgresql://ngoma_user:your_db_password@db:5432/ngoma_db
         JWT_SECRET: your_secure_jwt_secret
         # Add other environment variables
       restart: always

     frontend:
       image: ngoma-frontend
       depends_on:
         - backend
       environment:
         NEXT_PUBLIC_API_URL: https://api.your-domain.com
         # Add other environment variables
       restart: always

     nginx:
       image: nginx:latest
       volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf
       ports:
         - '80:80'
         - '443:443'
       depends_on:
         - backend
         - frontend
       restart: always

   volumes:
     postgres_data:
   ```

3. **Create Nginx configuration:**
   Create an `nginx.conf` file:

   ```
   events {
     worker_connections 1024;
   }

   http {
     server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$host$request_uri;
     }

     server {
       listen 443 ssl;
       server_name your-domain.com;

       ssl_certificate /etc/nginx/ssl/fullchain.pem;
       ssl_certificate_key /etc/nginx/ssl/privkey.pem;

       location / {
         proxy_pass http://frontend:3000;
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
       }

       location /api {
         proxy_pass http://backend:4000;
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
       }
     }
   }
   ```

4. **Start the containers:**
   ```bash
   docker-compose up -d
   ```

### Cloud Deployment

#### AWS Deployment Example

1. **Set up Infrastructure:**

   - Create Amazon RDS PostgreSQL database
   - Configure EC2 instances or ECS/EKS for containers
   - Set up Elastic Load Balancer
   - Configure Route 53 for domain routing

2. **Deploy Backend:**

   - Use Elastic Beanstalk or ECS for Node.js application
   - Configure environment variables in AWS Parameter Store
   - Set up auto-scaling based on load

3. **Deploy Frontend:**

   - Build Next.js application: `npm run build`
   - Deploy static files to S3 bucket
   - Configure CloudFront distribution for CDN

4. **Set up CI/CD:**
   - Configure AWS CodePipeline or GitHub Actions
   - Automate testing, building, and deployment process

## Post-Deployment Steps

1. **Verify Deployment:**

   ```bash
   # Test backend health endpoint
   curl https://api.your-domain.com/health

   # Test frontend loading
   curl -I https://your-domain.com
   ```

2. **Database Backups:**

   - Configure automated database backups
   - Test backup and restoration procedures

3. **Monitoring and Logging:**

   - Set up AWS CloudWatch or similar monitoring service
   - Configure log aggregation and alerting

4. **Security Checks:**
   - Verify SSL/TLS configuration
   - Test API authentication
   - Ensure environment variables are secure

## Scaling Considerations

1. **Horizontal Scaling:**

   - Backend: Add more instances behind load balancer
   - Frontend: Optimize CDN configuration
   - Database: Consider read replicas for high-traffic scenarios

2. **Performance Optimization:**

   - Enable server-side caching for frequently accessed data
   - Optimize database queries and add appropriate indexes
   - Implement rate limiting for API endpoints

3. **Cost Optimization:**
   - Use auto-scaling to match resources with demand
   - Consider reserved instances for persistent workloads
   - Monitor and optimize resource usage regularly

## Troubleshooting

### Common Issues and Solutions

1. **Database Connection Failures:**

   - Verify database credentials and connection string
   - Check network configuration and security groups
   - Ensure database service is running

2. **JWT Authentication Issues:**

   - Verify JWT_SECRET is consistent across all instances
   - Check token expiration settings
   - Validate token signature algorithm

3. **Frontend API Connection Errors:**

   - Confirm CORS settings on backend
   - Verify API URL configuration in frontend
   - Check network request formatting

4. **Smart Contract Interactions:**
   - Verify Web3 provider connectivity
   - Ensure contract ABI is up to date
   - Check wallet connection and transaction signing

## Maintenance

### Routine Maintenance Tasks

1. **Updates and Patches:**

   - Regularly update dependencies
   - Apply security patches promptly
   - Test updates in staging before production deployment

2. **Database Maintenance:**

   - Run regular VACUUM operations
   - Monitor and optimize slow queries
   - Manage database growth and scale accordingly

3. **Backup Procedures:**
   - Perform regular database backups
   - Test restoration procedures
   - Store backups securely in multiple locations

By following this deployment guide, you should have a fully functional Ngoma platform running in your chosen environment. For additional support, refer to the project documentation or contact the development team.
