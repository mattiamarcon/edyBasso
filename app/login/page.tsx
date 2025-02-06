"use client"

import LoginForm from "@/app/components/LoginForm"

export default function LoginPage() {

  return (
    <div className="bg-gray-50 flex items-center justify-center md:p-20">
      <div className="w-full md:max-w-xl">
        <div className="bg-white shadow-xl rounded-lg p-4">
          <LoginForm />
        </div>
      </div> 
    </div>
  )
}



