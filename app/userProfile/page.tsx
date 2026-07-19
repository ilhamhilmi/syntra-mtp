"use client"

import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/protect/ProtectedRoute"
import DockClient from "@/components/dock/DockClient/page"
import { CiMail, CiLogout } from "react-icons/ci";

export default function UserProfile() {
    const [user, setUser] = useState<any>(null);

    const router = useRouter();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            if (currentUser) {
                setUser(currentUser);
            } else {
                router.replace("/login");
            }

        });

        return () => unsubscribe();

    }, []);

    const handleLogout = async () => {
        try {

            await signOut(auth);

            toast.success("Logout berhasil");

            router.push("/login");

        } catch {

            toast.error("Logout gagal");

        }
    };

    return (
        <ProtectedRoute>
            <section className="items-center flex justify-center h-screen bg-slate-100">
                <DockClient />
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-white border border-secondary text-center xl:w-1/4 w-4/5 px-6 py-10 space-y-3 shadow-md rounded-sm">
                            <h1 className="font-inter text-black font-semibold text-3xl mb-10">Informasi Akun</h1>
                            <div className="relative">
                                <h1 className="border border-slate-500 w-full p-2 rounded-md font-inter text-secondary focus:border-white text-start">{user?.email}</h1>
                                <CiMail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                            </div>
                            {/* <div className="relative">
                            <input type={showPassword ? "text" : "password"} className="border border-slate-500 w-full p-2 rounded-md font-inter text-secondary focus:border-white" placeholder="Kata sandi" autoComplete="off" />
                            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-1/2 -translate-y-1/2'>
                                <Image src={showPassword ? hidePass : showPass} alt={showPassword ? "Hide password" : "Show password"} width={20} height={20} />
                            </button>
                        </div> */}
                            <button onClick={handleLogout} className="border rounded-md w-full py-2 font-inter bg-red-500 border-red-500  text-white font-poppins hover:bg-red-600 hover:border-red-600 cursor-pointer duration-200 flex items-center justify-center uppercase font-semibold">Logout<CiLogout className="ml-1 text-white h-5 w-5" /></button>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedRoute>
    )
}