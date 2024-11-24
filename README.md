## <a name="introduction">🤖 Introduction</a>

On this website you can create a CV and discover other members' ones.


## <a name="prod">Production</a>

Deployed with Vercel: https://curriculum-vitae-kappa.vercel.app/

## <a name="tech-stack">⚙️ Tech Stack</a>

FullStack app developped with :

- Next.js (v15) / React.js (v19) / Node.js (v20) -> use of recent features like server actions, useTransition, useActionState, use hook ...
- TypeScript
- MongoDB
- Clerk
- Shadcn
- TailwindCSS
- axios / api routes



**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# MongoDB
MONGO_DB_URL=

#Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=

#Clerk webhook
WEBHOOK_SECRET=
```


**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.


