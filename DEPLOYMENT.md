# Railway Deployment Guide

## Prerequisites

- Railway account (https://railway.app)
- GitHub repository connected to Railway
- OpenRouter API key

## Step 1: Create New Railway Project

1. Go to Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

## Step 2: Provision PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Wait for provisioning
4. Copy the `DATABASE_URL` connection string

## Step 3: Deploy API Backend

1. Click "New" → "GitHub Repo"
2. Configure service:
   - **Name:** `bio-theology-api`
   - **Root Directory:** `apps/api`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`

3. Add environment variables:

   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   OPENROUTER_API_KEY=your_key_here
   API_PORT=3001
   NODE_ENV=production
   ```

4. Deploy and note the public URL

## Step 4: Deploy Web Frontend

1. Click "New" → "GitHub Repo"
2. Configure service:
   - **Name:** `bio-theology-web`
   - **Root Directory:** `apps/web`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`

3. Add environment variables:

   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.railway.app
   ```

4. Deploy and note the public URL

## Step 5: Setup Hermie Cron Job

1. Click "New" → "Cron Job"
2. Configure:
   - **Name:** `hermie-scout`
   - **Schedule:** `0 */6 * * *` (every 6 hours)
   - **Command:** `npm run hermie`

3. Add environment variables:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```

## Step 6: Setup Jimmy Worker

1. Click "New" → "Worker"
2. Configure:
   - **Name:** `jimmy-scribe`
   - **Schedule:** `0 */1 * * *` (every hour)
   - **Command:** `npm run jimmy`

3. Add environment variables:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   OPENROUTER_API_KEY=your_key_here
   ```

## Step 7: Run Database Migrations

1. In the API service, go to "Settings" → "Run Command"
2. Execute:
   ```bash
   npm run db:push
   ```

## Step 8: Verify Deployment

1. Visit your web frontend URL
2. Check API health: `https://your-api-url.railway.app/health`
3. Monitor logs in each service
4. Wait for Hermie to run first cron job
5. Check if Jimmy processes the data

## Environment Variables Summary

### API Service

- `DATABASE_URL` → Reference Postgres service
- `OPENROUTER_API_KEY` → Your OpenRouter key
- `API_PORT` → 3001
- `NODE_ENV` → production

### Web Service

- `NEXT_PUBLIC_API_URL` → API service public URL

### Hermie Cron

- `DATABASE_URL` → Reference Postgres service

### Jimmy Worker

- `DATABASE_URL` → Reference Postgres service
- `OPENROUTER_API_KEY` → Your OpenRouter key

## Monitoring

- **Logs:** View real-time logs in each service
- **Metrics:** Railway provides CPU/Memory usage
- **Alerts:** Setup webhooks for failures

## Cost Optimization

- Railway scales down when idle
- Set resource limits if needed:
  - API: 1GB RAM / 1 vCPU
  - Web: 1GB RAM / 1 vCPU
  - Workers: 512MB RAM

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is correctly referenced
- Check Postgres service is running

### API Not Responding

- Check logs for errors
- Verify build completed successfully
- Test health endpoint

### Cron Not Running

- Check cron schedule syntax
- Verify environment variables
- Review execution logs

### Jimmy Processing Errors

- Verify OpenRouter API key is valid
- Check for rate limiting issues
- Monitor token usage

## Production Checklist

- [ ] All environment variables set
- [ ] Database migrations run successfully
- [ ] API health endpoint responding
- [ ] Web frontend loads correctly
- [ ] Hermie cron job configured
- [ ] Jimmy worker running
- [ ] CORS configured for production domain
- [ ] OpenRouter API key funded
- [ ] Monitoring setup
- [ ] Backup strategy for database

## Useful Commands

```bash
# Check database schema
npm run db:studio

# Manual trigger Hermie
railway run npm run hermie

# Manual trigger Jimmy
railway run npm run jimmy

# View logs
railway logs

# Restart service
railway restart
```
