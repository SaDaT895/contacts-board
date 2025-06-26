# ContactsBoard 
Backend: NestJS, HubSpot OAuth and Contacts CRM

Frotnend: React Router, Vite, MUI, Vitest

For the sake of simplicity, the OAuth token from HubSpot is stored in session cookies. In a production envrionment however this should be handled accordingly.

# Get Started Locally
Backend (port: 3000): 
- Setup .env file (Check .env.example)
- `nest start`
- Test: `npm run test`

Frotnend (port: 5173): 
- `npm run dev`
- Test: `npm run test`

OR start the whole app using docker: `docker compose up` and navigate to http://localhost:5173

