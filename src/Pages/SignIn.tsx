import React from 'react'
import { LoginForm } from '@/components/ui/login-form'

export const SignIn = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
            style={
                {
                    backgroundColor: "#f3f4f6",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                }
            }
        >
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}
