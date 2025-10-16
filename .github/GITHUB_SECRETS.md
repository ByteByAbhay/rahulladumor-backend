# GitHub Secrets Configuration

To enable the GitHub Actions deployment workflow, you need to configure the following secrets in your GitHub repository.

## How to Add Secrets

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret listed below

---

## Required Secrets

### AWS Configuration (Optional - only if using AWS services)
- `AWS_ACCESS_KEY_ID` - Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret access key
- `AWS_REGION` - Your AWS region (e.g., `us-east-1`)

### EC2 SSH Configuration
- `EC2_SSH_PRIVATE_KEY` - Your EC2 private SSH key (entire content of .pem file)
- `EC2_HOST` - Your EC2 instance public IP or hostname
- `EC2_USER` - SSH user (typically `ubuntu` or `ec2-user`)
- `DEPLOY_PATH` - Base deployment path on EC2 (e.g., `/home/ubuntu/projects`)

### Backend Environment Variables
- `BACKEND_PORT` - Backend server port (e.g., `3002`)
- `BACKEND_NODE_ENV` - Node environment (e.g., `production`)
- `BACKEND_MONGODB_URI` - MongoDB connection string
- `BACKEND_DB_NAME` - Database name (e.g., `rahulladumor_portfolio`)
- `BACKEND_JWT_SECRET` - JWT secret key for authentication
- `BACKEND_JWT_EXPIRES_IN` - JWT expiration time (e.g., `7d`)
- `BACKEND_EMAIL_USER` - Email service username
- `BACKEND_EMAIL_PASS` - Email service password/app password
- `BACKEND_EMAIL_FROM` - From email address
- `BACKEND_ADMIN_EMAIL` - Admin email address
- `BACKEND_DEV_COMMUNITY_API_KEY` - DEV Community API key

---

## Example Values (Based on your .env)

```bash
# EC2 Configuration
EC2_HOST=your-ec2-ip-or-hostname
EC2_USER=ubuntu
DEPLOY_PATH=/home/ubuntu/projects

# Backend Configuration
BACKEND_PORT=3002
BACKEND_NODE_ENV=production
BACKEND_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
BACKEND_DB_NAME=rahulladumor_portfolio
BACKEND_JWT_SECRET=your-jwt-secret-key
BACKEND_JWT_EXPIRES_IN=7d
BACKEND_EMAIL_USER=noreply@acloudwithrahul.in
BACKEND_EMAIL_PASS=your-app-password
BACKEND_EMAIL_FROM=noreply@acloudwithrahul.in
BACKEND_ADMIN_EMAIL=contact@acloudwithrahul.in
BACKEND_DEV_COMMUNITY_API_KEY=your-dev-community-api-key
```

---

## Important Notes

1. **Never commit secrets to your repository**
2. **EC2_SSH_PRIVATE_KEY**: Copy the entire content of your `.pem` file including the header and footer
3. **Email Password**: For Gmail, use an App Password (not your regular password)
4. **MongoDB URI**: Ensure the connection string is properly URL-encoded
5. **DEPLOY_PATH**: Should be the parent directory containing `rahulladumor-backend`

---

## Deployment Triggers

The workflow will automatically deploy when:
- Code is pushed to the `main` branch
- Manually triggered via GitHub Actions UI (workflow_dispatch)

---

## PM2 Configuration

The workflow assumes PM2 is installed on your EC2 instance. If not already set up:

```bash
# On your EC2 instance
npm install -g pm2
cd /path/to/rahulladumor-backend
pm2 start server.js --name rahulladumor-backend
pm2 save
pm2 startup
```
