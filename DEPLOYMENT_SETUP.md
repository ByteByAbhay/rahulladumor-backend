# 🚀 Quick Deployment Setup

This is a quick start guide to set up the deployment API. For detailed documentation, see [DEPLOYMENT_API_GUIDE.md](./DEPLOYMENT_API_GUIDE.md).

## ⚡ Quick Start (5 minutes)

### 1. Create GitHub Token

1. Go to GitHub → Settings → Developer settings → Personal Access Tokens → **Fine-grained tokens**
2. Click **"Generate new token"**
3. Configure:
   - **Repository access**: Select your frontend repo
   - **Permissions**:
     - ✅ Actions: **Read and Write**
     - ✅ Contents: **Read-only**
4. Copy the token (starts with `ghp_`)

### 2. Update `.env` File

Add these lines to your `.env` file:

```bash
# GitHub Deployment Configuration
GITHUB_TOKEN=ghp_your_actual_token_here
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-frontend-repo-name
WORKFLOW_FILE=deploy-admin-frontend.yml
```

**Example:**
```bash
GITHUB_TOKEN=ghp_abc123xyz789
GITHUB_OWNER=ByteByAbhay
GITHUB_REPO=rahulladumor-frontend
WORKFLOW_FILE=deploy-admin-frontend.yml
```

### 3. Test the Setup

Run the test script:

```bash
./test-deployment.sh
```

Or manually test:

```bash
# 1. Login as admin
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# 2. Check configuration (use token from login)
curl -X GET http://localhost:3002/api/deployment/status \
  -H "Authorization: Bearer YOUR_TOKEN"

# 3. Trigger deployment
curl -X POST http://localhost:3002/api/deployment/trigger \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"branch": "main"}'
```

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/deployment/trigger` | Trigger deployment | Admin |
| `GET` | `/api/deployment/status` | Check configuration | Admin |

## 💻 Frontend Integration

### Simple Button Example

```javascript
const handleDeploy = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3002/api/deployment/trigger', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ branch: 'main' }),
  });

  const data = await response.json();
  
  if (data.status === 'success') {
    alert('🚀 Deployment triggered successfully!');
  } else {
    alert(`❌ Error: ${data.message}`);
  }
};

// Use in your component
<button onClick={handleDeploy} className="btn btn-success">
  🚀 Deploy Frontend
</button>
```

## 🔍 Troubleshooting

### "GitHub deployment configuration is missing"
➡️ Add all required variables to `.env` file

### "Not authorized, no token provided"
➡️ Include JWT token in Authorization header

### "Access denied. Admin privileges required"
➡️ Only admin users can trigger deployments

### "Failed to trigger deployment" (404)
➡️ Check repository name and workflow file name

### "Failed to trigger deployment" (403)
➡️ Token needs Actions Read/Write permissions

## 📚 Documentation

- **Full Guide**: [DEPLOYMENT_API_GUIDE.md](./DEPLOYMENT_API_GUIDE.md)
- **API Docs**: http://localhost:3002/api-docs
- **Frontend Guide**: [FRONTEND_API_GUIDE.md](./FRONTEND_API_GUIDE.md)

## ✅ Checklist

- [ ] Created GitHub fine-grained token
- [ ] Added token to `.env` file
- [ ] Added repository details to `.env`
- [ ] Tested with `./test-deployment.sh`
- [ ] Verified in Swagger UI
- [ ] Integrated in admin panel

---

**Need help?** Check the [full documentation](./DEPLOYMENT_API_GUIDE.md) or open an issue.
