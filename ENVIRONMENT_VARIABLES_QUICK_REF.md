# 🚀 Quick Reference: Environment Variables Setup

## ✅ What Was Fixed

### Problem

- Netlify deployment (https://nicktechbytes.netlify.app) was hitting `http://localhost:8080` instead of Railway backend
- Need different API URLs for different environments

### Solution

Created proper environment variable configuration for all deployment scenarios.

---

## 📁 Environment Files Created/Updated

### 1. `.env.local` (Local Development - localhost backend)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

- **Use when:** Running `npm run dev` with local backend
- **Committed:** ❌ No (in .gitignore)

### 2. `.env.development` (Netlify Dev - Railway backend)

```bash
NEXT_PUBLIC_API_URL=https://nicktechbytes-be-dev-production.up.railway.app/api/v1
```

- **Use when:** Testing locally but hitting Railway backend
- **Committed:** ❌ No (in .gitignore)

### 3. `.env.production` (Netlify Production - Railway backend)

```bash
NEXT_PUBLIC_API_URL=https://nicktechbytes-be-dev-production.up.railway.app/api/v1
```

- **Use when:** Production builds
- **Committed:** ❌ No (in .gitignore)

### 4. `netlify.toml` (Netlify Configuration)

- Contains build settings and default environment variables
- **Committed:** ✅ Yes

### 5. `.env.example` (Template/Documentation)

- Shows what variables are needed
- **Committed:** ✅ Yes

---

## 🎯 IMMEDIATE ACTION REQUIRED

### Go to Netlify Dashboard and Set These Variables:

1. **Login to Netlify:** https://app.netlify.com/
2. **Select your site:** nicktechbytes
3. **Navigate to:** Site Settings → Environment Variables
4. **Click:** "Add a variable"

### Add These Variables:

```env
NEXT_PUBLIC_API_URL=https://nicktechbytes-be-dev-production.up.railway.app/api/v1
NEXT_PUBLIC_SUPABASE_URL=https://leleeyyrhukjhlabdixg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbGVleXlyaHVramhsYWJkaXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjQ0MTMsImV4cCI6MjA3OTg0MDQxM30.AfFdEhVCUBXA8CUmo1MQwDnQHyC7AdUg9z_Ve5t-1ww
NEXT_PUBLIC_ENVIRONMENT=production
NODE_ENV=production
```

5. **Apply to:** All scopes (Production, Deploy previews, Branch deploys)
6. **Save** and trigger a new deploy

---

## 🧪 How to Test

### After Setting Netlify Variables:

1. **Trigger New Deploy:**

   - Netlify Dashboard → Deploys → Trigger deploy → Clear cache and deploy site

2. **Test on Netlify:**

   - Go to: https://nicktechbytes.netlify.app/login
   - Open browser DevTools → Network tab
   - Try to login
   - **Verify:** Requests go to `https://nicktechbytes-be-dev-production.up.railway.app/api/v1/auth/login`
   - **NOT:** `http://localhost:8080`

3. **Test Locally:**
   ```bash
   cd /Users/nikhilgundala/Desktop/NTB/nick-tech-bytes
   npm run dev
   ```
   - Go to: http://localhost:3000/login
   - Try to login
   - **Verify:** Requests go to `http://localhost:8080/api/v1/auth/login` (local backend)

---

## 📊 Environment Routing Table

| Environment      | URL                               | API Backend                                            | Env File          |
| ---------------- | --------------------------------- | ------------------------------------------------------ | ----------------- |
| **Local Dev**    | http://localhost:3000             | http://localhost:8080                                  | `.env.local`      |
| **Netlify Dev**  | https://nicktechbytes.netlify.app | https://nicktechbytes-be-dev-production.up.railway.app | Netlify Variables |
| **Netlify Prod** | https://nicktechbytes.com         | https://nicktechbytes-be-dev-production.up.railway.app | Netlify Variables |

---

## 📝 Files to Commit

```bash
cd /Users/nikhilgundala/Desktop/NTB/nick-tech-bytes

# These files should be committed:
git add netlify.toml
git add .env.example
git add NETLIFY_ENVIRONMENT_SETUP.md

# These files should NOT be committed (already in .gitignore):
# .env.local
# .env.development
# .env.production

git commit -m "Configure environment variables for different deployment environments"
git push
```

---

## ✅ Checklist

- [x] Created `.env.local` for local development
- [x] Created `.env.development` for Netlify dev
- [x] Created `.env.production` for production builds
- [x] Created `netlify.toml` configuration
- [x] Updated `.env.example` with instructions
- [x] Created `NETLIFY_ENVIRONMENT_SETUP.md` guide
- [ ] **TODO:** Set environment variables in Netlify Dashboard
- [ ] **TODO:** Trigger new Netlify deploy
- [ ] **TODO:** Test login on https://nicktechbytes.netlify.app
- [ ] **TODO:** Verify API requests go to Railway backend

---

## 🎯 Expected Behavior After Setup

### Netlify Deployment (https://nicktechbytes.netlify.app)

```
Login Request → https://nicktechbytes-be-dev-production.up.railway.app/api/v1/auth/login
                ✅ Correct! (Railway backend)
```

### Local Development (http://localhost:3000)

```
Login Request → http://localhost:8080/api/v1/auth/login
                ✅ Correct! (Local backend)
```

---

## 📚 Documentation Files

1. **NETLIFY_ENVIRONMENT_SETUP.md** - Detailed Netlify setup guide
2. **This file** - Quick reference
3. **.env.example** - Environment variables template
4. **netlify.toml** - Netlify build configuration

---

**Status:** ✅ Configuration Complete  
**Next Step:** Set variables in Netlify Dashboard and deploy
