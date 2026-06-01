// src/app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-5">
      <div className="mc-bg" />
      <div className="relative z-10">
        <SignIn />
      </div>
    </main>
  )
}
