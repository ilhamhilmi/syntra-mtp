"use client"

import Image from "next/image"
import showPass from "@/public/password/eye-alt-svgrepo-com.svg"
import hidePass from "@/public/password/eye-slash-alt-svgrepo-com.svg"
import { useState } from "react"


export default function UserProfile() {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <section className="items-center flex justify-center h-screen bg-slate-100">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-white border border-secondary text-center xl:w-1/4 w-2/3 px-6 py-10 space-y-3 shadow-md rounded-sm">
                        <h1 className="font-inter text-black font-semibold text-3xl mb-10">Informasi Akun</h1>
                        <input className="border border-slate-500 w-full p-2 rounded-md font-inter text-secondary focus:border-white" placeholder="Username" autoComplete="off" />
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} className="border border-slate-500 w-full p-2 rounded-md font-inter text-secondary focus:border-white" placeholder="Password" autoComplete="off" />
                            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-1/2 -translate-y-1/2'>
                                <Image src={showPassword ? hidePass : showPass} alt={showPassword ? "Hide password" : "Show password"} width={20} height={20} />
                            </button>
                        </div>
                        <button className="border rounded-md w-full py-1 font-inter bg-red-500 border-red-500  text-white font-poppins hover:bg-red-600 hover:border-red-600 cursor-pointer duration-200">Logout</button>
                        <a href="/register-operator"><button className="text-white px-2 py-1  font-poppins">Create Account</button></a>
                    </div>
                </div>
            </div>
        </section>
    )
}