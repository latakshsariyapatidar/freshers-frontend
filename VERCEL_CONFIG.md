# Vercel Deployment Configuration

## Overview
The `vercel.json` file configures Vercel to proxy API requests from your frontend to your AWS EC2 backend server running on port 5000.

## How It Works

### 1. Request Flow
```
Frontend Call: fetch("/api/v1/fresherParty/login")
       ↓
Vercel Proxy: Intercepts /api/* requests
       ↓
Backend: http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com:5000/api/v1/fresherParty/login
```

### 2. Configuration Details

#### Rewrites
```json
{
  "source": "/api/(.*)",
  "destination": "http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com:5000/api/$1"
}
```
- Captures any request starting with `/api/`
- Forwards to EC2 server on port 5000
- Maintains the full path structure

#### CORS Headers
```json
{
  "source": "/api/(.*)",
  "headers": [
    {
      "key": "Access-Control-Allow-Origin",
      "value": "*"
    }
  ]
}
```
- Adds proper CORS headers to API responses
- Allows cross-origin requests
- Prevents CORS blocking issues

### 3. Environment Variables

#### For Vercel Deployment
```bash
VITE_API_URL=/api
VITE_SOCKET_URL=
```

#### For Local Development  
```bash
VITE_API_URL=http://localhost:5175/api
VITE_SOCKET_URL=http://localhost:5175
```

## Deployment Steps

### 1. Deploy to Vercel
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Set Environment Variables
In Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add `VITE_API_URL=/api`
- Add `VITE_SOCKET_URL=` (empty)

### 3. Verify Deployment
Your frontend will be available at: `https://your-app.vercel.app`

API calls like:
```javascript
fetch("/api/v1/fresherParty/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
})
```

Will be automatically proxied to:
`http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com:5000/api/v1/fresherParty/login`

## Benefits

✅ **No CORS Issues**: Vercel handles cross-origin requests  
✅ **Seamless Proxying**: Frontend uses relative URLs  
✅ **Production Ready**: Works with your EC2 backend  
✅ **Socket.IO Support**: WebSocket connections proxied  
✅ **Easy Maintenance**: Change backend URL in one place  

## Troubleshooting

### Common Issues

1. **API Calls Failing**
   - Check Vercel logs: `vercel logs`
   - Verify EC2 server is running on port 5000
   - Check EC2 security group allows inbound connections

2. **CORS Errors**
   - Ensure `vercel.json` headers are properly configured
   - Verify EC2 backend doesn't override CORS headers

3. **Build Failures**
   - Check `package.json` has correct build script
   - Verify environment variables are set in Vercel dashboard

### Testing Locally
```bash
# Start local development with proxy
npm run dev

# Test API endpoint
curl http://localhost:5173/api/health
```

## Backend Requirements

Your EC2 backend should:
- Run on port 5000
- Accept requests from any origin (or specifically from Vercel domains)
- Have proper API endpoints under `/api/v1/fresherParty/`

Example Express.js setup:
```javascript
const express = require('express');
const app = express();

// CORS middleware (optional since Vercel handles it)
app.use(cors());

// API routes
app.use('/api/v1/fresherParty', yourRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

## Security Notes

- The proxy configuration allows all origins (`*`)
- Consider restricting to specific domains in production
- Ensure your EC2 security groups are properly configured
- Use HTTPS for EC2 if possible (requires SSL certificate)
