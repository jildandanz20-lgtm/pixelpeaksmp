// src/app/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-5">
      <div className="mc-bg" />
      <div className="relative z-10">
        <SignUp />
      </div>
    </main>
  )
}
