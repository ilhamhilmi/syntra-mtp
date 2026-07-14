"use client"

import { useEffect, useState } from "react"
import DockClient from "@/components/dock/DockClient/page"
import Link from "next/link"
import { ref, onValue, set } from "firebase/database"
import { db } from "@/lib/firebase"
import ProtectedRoute from "@/components/protect/ProtectedRoute"

export default function Rooms() {
    const [devices, setDevices] = useState({
        lamp1: false,
        lamp2: false,
        lamp3: false
    })
    const [motion, setMotion] = useState(false)

    useEffect(() => {
        const devicesRef = ref(db, "devices");

        const unsubscribe = onValue(devicesRef, (snapshot) => {
            if (!snapshot.exists()) return;

            const data = snapshot.val();

            setDevices({
                lamp1: data.lamp1,
                lamp2: data.lamp2,
                lamp3: data.lamp3,
            });

            setMotion(data.motion);

            console.log(data);
        });

        return () => unsubscribe();

    }, []);
    return (
        <ProtectedRoute>
            <DockClient />

            <section className="min-h-screen bg-slate-100 px-4 pt-8 pb-28">
                <div className="container mx-auto max-w-md">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 font-inter">
                            Ruangan
                        </h1>
                        <p className="text-sm text-secondary font-inter">
                            Daftar ruang kelas Smart Classroom.
                        </p>
                    </div>

                    {/* Rooms */}
                    <div className="grid grid-cols-1 gap-3">

                        <Link href="/rooms/roomDetails" className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition">
                            <h1 className="font-semibold text-gray-800 font-inter">
                                Ruang C1-1
                            </h1>

                            <p className="text-sm text-secondary mt-1">
                                Lantai 1 - Gedung C
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                                <div
                                    className={`px-3 py-1 rounded-md text-white text-sm font-inter ${motion ? "bg-green-500" : "bg-red-500"
                                        }`}
                                >
                                    {motion ? "Gerakan Terdeteksi" : "Tidak Ada Gerakan"}
                                </div>
                            </div>
                        </Link>

                        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition">
                            <h1 className="font-semibold text-gray-800 font-inter">
                                Ruang C1-1
                            </h1>

                            <p className="text-sm text-secondary mt-1">
                                Lantai 1
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                                <div className="border px-2 py-1 bg-secondary rounded-md">
                                    <p className="text-sm text-white">Tidak ada gerakan</p>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </section>
        </ProtectedRoute>
    )
}