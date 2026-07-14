"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {

    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (!user) {
                router.replace("/login");
            } else {
                setChecking(false);
            }

        });

        return () => unsubscribe();

    }, [router]);

    if (checking) return null;

    return <>{children}</>;
}