# 🌐 Netlify Environment Variables Configuration Guide

## 📋 Overview

This guide shows you how to configure environment variables in Netlify for the NickTechBytes frontend.

---

## 🔧 Setting Environment Variables in Netlify

### Step 1: Access Netlify Dashboard

1. Go to: https://app.netlify.com/
2. Login to your account
3. Select your site: **nicktechbytes** (or whatever you named it)

### Step 2: Navigate to Environment Variables

1. Click **Site Settings** in the top menu
2. Scroll down to **Environment Variables** in the left sidebar
3. Click **Environment Variables**

### Step 3: Add Variables

Click **Add a variable** and add each of the following:

---

## 📝 Required Environment Variables

### 1. Backend API URL

**Key:** `NEXT_PUBLIC_API_URL`  
**Value for Production:**

```
https://nicktechbytes-be-dev-production.up.railway.app/api/v1
```

**Scopes:**

- ✅ Production
- ✅ Deploy previews
- ✅ Branch deploys

---

### 2. Supabase URL (Optional - if using Supabase client-side)

**Key:** `NEXT_PUBLIC_SUPABASE_URL`  
**Value:**

```
https://leleeyyrhukjhlabdixg.supabase.co
```

**Scopes:**

- ✅ Production
- ✅ Deploy previews
- ✅ Branch deploys

---

### 3. Supabase Anon Key (Optional - if using Supabase client-side)

**Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
**Value:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbGVleXlyaHVramhsYWJkaXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjQ0MTMsImV4cCI6MjA3OTg0MDQxM30.AfFdEhVCUBXA8CUmo1MQwDnQHyC7AdUg9z_Ve5t-1ww
```

**Scopes:**

- ✅ Production
- ✅ Deploy previews
- ✅ Branch deploys

---

### 4. Environment Identifier

**Key:** `NEXT_PUBLIC_ENVIRONMENT`  
**Value for Production:** `production`  
**Value for Dev:** `development`

**Scopes:**

- ✅ Production
- ✅ Deploy previews
- ✅ Branch deploys

---

### 5. Node Environment

**Key:** `NODE_ENV`  
**Value:** `production`

**Scopes:**

- ✅ Production
- ✅ Deploy previews
- ✅ Branch deploys

---

## 🎯 Quick Copy-Paste Format

Copy these into Netlify's "Add multiple variables" feature:

```env
NEXT_PUBLIC_API_URL=https://nicktechbytes-be-dev-production.up.railway.app/api/v1
NEXT_PUBLIC_SUPABASE_URL=https://leleeyyrhukjhlabdixg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbGVleXlyaHVramhsYWJkaXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjQ0MTMsImV4cCI6MjA3OTg0MDQxM30.AfFdEhVCUBXA8CUmo1MQwDnQHyC7AdUg9z_Ve5t-1ww
NEXT_PUBLIC_ENVIRONMENT=production
NODE_ENV=production
```

---

## 🔄 Environment File Priority

Next.js loads environment variables in this order (later files override earlier ones):

1. `.env` - Loaded in all environments (not recommended for this project)
2. `.env.local` - Loaded in all environments, ignored by git ✅
3. `.env.development` - Loaded in development mode only ✅
4. `.env.production` - Loaded in production mode only ✅
5. **Netlify Environment Variables** - Highest priority for deployed sites ✅

---

## 📦 Current Configuration Summary

### Local Development (npm run dev)

- Uses: `.env.local`
- API URL: `http://localhost:8080/api/v1`
- For developers running backend locally

### Netlify Development Deploy (https://nicktechbytes.netlify.app)

- Uses: Netlify Environment Variables
- API URL: `https://nicktechbytes-be-dev-production.up.railway.app/api/v1`
- For testing without local backend

### Netlify Production Deploy (https://nicktechbytes.com)

- Uses: Netlify Environment Variables
- API URL: `https://nicktechbytes-be-dev-production.up.railway.app/api/v1`
- For production users

---

## 🧪 Testing After Configuration

### 1. Trigger a New Deploy

After setting environment variables:

1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Clear cache and deploy site**

### 2. Verify API URL in Production

1. Open browser console on: https://nicktechbytes.netlify.app
2. Check network requests - they should go to Railway backend
3. Try logging in - should hit Railway API

### 3. Check Build Logs

1. Click on the latest deploy
2. Look for environment variables being loaded
3. Ensure `NEXT_PUBLIC_API_URL` is set correctly

---

## 🚨 Troubleshooting

### Issue: Still hitting localhost:8080

**Solution:**

1. Clear Netlify cache: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
2. Verify environment variables are set in Netlify dashboard
3. Check that variable names start with `NEXT_PUBLIC_`

### Issue: Environment variables not loading

**Solution:**

1. Ensure variable names are EXACT (case-sensitive)
2. Re-deploy after adding variables
3. Check that variables are scoped to the correct deployment contexts

### Issue: 404 or CORS errors

**Solution:**

1. Verify Railway backend is running: `curl https://nicktechbytes-be-dev-production.up.railway.app/api/v1/health`
2. Check CORS settings in backend `application-dev.properties`
3. Ensure Netlify URL is in backend CORS allowed origins

---

## 📱 Different Environments Explained

### 1. Local Development

- **When:** Running `npm run dev` on your machine
- **Uses:** `.env.local`
- **API:** `http://localhost:8080/api/v1`
- **Best for:** Full-stack local development

### 2. Netlify Deploy Previews

- **When:** Pull request preview builds
- **Uses:** Netlify Environment Variables
- **API:** `https://nicktechbytes-be-dev-production.up.railway.app/api/v1`
- **Best for:** Testing features before merge

### 3. Netlify Branch Deploys

- **When:** Deploying from non-main branches
- **Uses:** Netlify Environment Variables
- **API:** `https://nicktechbytes-be-dev-production.up.railway.app/api/v1`
- **Best for:** Development/staging environment

### 4. Netlify Production

- **When:** Deploying from main branch
- **Uses:** Netlify Environment Variables
- **API:** `https://nicktechbytes-be-dev-production.up.railway.app/api/v1`
- **Best for:** Live production site

---

## 🎯 Next Steps

1. ✅ Set environment variables in Netlify
2. ✅ Trigger a new deploy
3. ✅ Test login on https://nicktechbytes.netlify.app/login
4. ✅ Verify network requests go to Railway backend
5. ✅ Test authentication flow end-to-end

---

## 📞 Need Help?

If you're still having issues:

1. Check Netlify deploy logs for errors
2. Verify Railway backend is accessible
3. Test API directly: `curl https://nicktechbytes-be-dev-production.up.railway.app/api/v1/health`
4. Check browser console for error messages

---

**Last Updated:** November 30, 2024  
**Status:** ✅ Configuration Complete
