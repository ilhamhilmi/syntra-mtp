"use client"

import Image from "next/image"
import showPass from "@/public/password/eye-alt-svgrepo-com.svg"
import hidePass from "@/public/password/eye-slash-alt-svgrepo-com.svg"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast"
import { CiMail, CiLogin } from "react-icons/ci"
import Link from "next/link"


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();

    const handleLogin = async () => {

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            toast.success("Selamat datang!")
            router.push("/");

        } catch {

            toast.error("Email atau password salah.");

        }
    };

    return (
        <section className="items-center flex justify-center min-h-screen">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="clay-card text-center xl:w-1/4 w-4/5 px-8 py-12 space-y-5">
                        <h1 className="font-inter text-foreground font-semibold text-3xl mb-6">Syntra</h1>
                        <div className="relative">
                            <CiMail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                            <input className="clay-input pr-10" placeholder="Email petugas" autoComplete="off" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} className="clay-input pr-10" placeholder="Kata sandi" autoComplete="off" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-1/2 -translate-y-1/2'>
                                <Image src={showPassword ? hidePass : showPass} alt={showPassword ? "Hide password" : "Show password"} width={20} height={20} />
                            </button>
                        </div>
                        <button onClick={handleLogin} className="clay-btn-primary w-full py-3 flex items-center justify-center uppercase font-semibold text-sm">Masuk <CiLogin className="ml-2 text-white h-5 w-5" /></button>
                        <Link href="/" className="font-inter text-sm underline text-primary">Butuh bantuan?</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}