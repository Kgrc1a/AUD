# ITSC Audit

Ledger + audit checks for the ITSC trackers (1st Sem, GCash, Printing). Next.js on Vercel, Neon Postgres.

## Deploy
1. Push this folder to a GitHub repo and import it in Vercel (or run `vercel` in this folder).
2. Vercel > Settings > Environment Variables: confirm `DATABASE_URL` exists (the Neon integration adds it), then add `AUDIT_PASSWORD` and `SESSION_SECRET` (`openssl rand -hex 32`).
3. Create the tables once from your computer:
   `npm install && vercel env pull .env.local && npm run db:setup`
4. Deploy. Open the URL, sign in with `AUDIT_PASSWORD`.

## Audit rules (lib/audit.js)
Overdrawn balance, possible duplicate, future date, marked has-issues, expense without proof, date out of sequence (day/month swap), no date, no FOC, not yet approved. Run `npm run test:audit`.

## Database guarantees (db/schema.sql)
Money in OR out per entry; non-negative amounts; fixed dropdown values; no deletes (void with a reason); append-only audit log written by a trigger.
