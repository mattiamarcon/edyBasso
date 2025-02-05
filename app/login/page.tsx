"use client"

import LoginForm from "@/app/components/LoginForm"

export default function LoginPage() {

  return (
    <div className="bg-gray-50 flex items-center justify-center p-20">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-lg p-4">
          <LoginForm />
        </div>
      </div> 
    </div>
  )
}



