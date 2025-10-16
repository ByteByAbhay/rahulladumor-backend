# Deployment Guide for Rahul Ladumor Backend

## Render Deployment Configuration

This backend is configured to deploy on Render at: https://rahulladumor-backend.onrender.com/

### Environment Variables on Render

Make sure to set the following environment variables in your Render dashboard:

1. **NODE_ENV** = `production`
2. **PORT** = (Leave empty, Render will set it automatically)
3. **EMAIL_USER** = Your email address for sending emails
4. **EMAIL_PASS** = Your email app password
5. **ADMIN_EMAIL** = Admin email to receive contact form submissions

### Swagger Documentation

The API documentation is available at:
- **Production**: https://rahulladumor-backend.onrender.com/api-docs
- **Local**: http://localhost:3002/api-docs

### CORS Configuration

The backend is configured with the following CORS settings:

1. **Allowed Origins**: 
   - All localhost ports (in development)
   - https://rahulladumor-backend.onrender.com
   - All *.onrender.com domains
   - Add your frontend URL to the `allowedOrigins` array in `src/app.js`

2. **Allowed Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS

3. **Credentials**: Enabled (cookies and authorization headers supported)

### Fixing CORS Issues

If you encounter CORS errors:

1. **For Swagger UI**: The configuration automatically detects the production environment and sets the correct server URL.

2. **For Frontend Applications**: Add your frontend URL to the `allowedOrigins` array in `src/app.js`:
   ```javascript
   const allowedOrigins = [
     'http://localhost:3000',
     'https://your-frontend.com', // Add your frontend URL here
     'https://rahulladumor-backend.onrender.com',
   ];
   ```

### Testing the Deployment

1. **Health Check**: https://rahulladumor-backend.onrender.com/health
2. **API Documentation**: https://rahulladumor-backend.onrender.com/api-docs
3. **Root Endpoint**: https://rahulladumor-backend.onrender.com/

### Build Command

For Render deployment, use:
```bash
npm install
```

### Start Command

For Render deployment, use:
```bash
npm start
```

### Auto-Deploy

Render can be configured to auto-deploy when you push to your main branch on GitHub/GitLab.

## Local Development

1. Copy `.env.example` to `.env`
2. Fill in your environment variables
3. Run `npm install`
4. Run `npm run dev` for development with nodemon
5. Access the API at http://localhost:3002

## Troubleshooting

### CORS Errors in Production

If you're getting CORS errors:
1. Check that `NODE_ENV=production` is set in Render environment variables
2. Verify your frontend URL is added to the allowed origins
3. Check browser console for the actual origin being sent
4. Ensure you're using HTTPS in production

### Swagger Not Loading

If Swagger UI is not loading:
1. Check that the server URL is correctly set in the Swagger configuration
2. Verify CORS is properly configured
3. Check browser console for any errors
4. Try accessing the raw API spec at `/api-docs/swagger.json`

### Email Not Working

If emails are not being sent:
1. Verify EMAIL_USER and EMAIL_PASS are set correctly
2. For Gmail, ensure you're using an App Password, not your regular password
3. Check that 2-factor authentication is enabled for Gmail
4. Review email service logs in Render dashboard
