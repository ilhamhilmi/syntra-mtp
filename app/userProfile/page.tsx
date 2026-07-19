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
            <section className="items-center flex justify-center min-h-screen">
                <DockClient />
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="clay-card text-center xl:w-1/4 w-4/5 px-8 py-12 space-y-5">
                            <h1 className="font-inter text-foreground font-semibold text-3xl mb-6">Informasi Akun</h1>
                            <div className="relative">
                                <h1 className="clay-input text-start">{user?.email}</h1>
                                <CiMail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                            </div>
                            <button onClick={handleLogout} className="clay-btn-danger w-full py-3 flex items-center justify-center uppercase font-semibold text-sm">Logout<CiLogout className="ml-2 text-white h-5 w-5" /></button>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedRoute>
    )
}