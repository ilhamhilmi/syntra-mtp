"use client"

import { useEffect, useState } from "react"
import DockClient from "@/components/dock/DockClient/page"
import Link from "next/link"
import { ref, onValue } from "firebase/database"
import { db } from "@/lib/firebase"
import ProtectedRoute from "@/components/protect/ProtectedRoute"
import { MdPerson, MdPersonOff } from "react-icons/md"

export default function Rooms() {
    const [, setDevices] = useState({
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

            <section className="min-h-screen px-4 pt-8 pb-28">
                <div className="container mx-auto max-w-md">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-foreground font-inter">
                            Ruangan
                        </h1>
                        <p className="text-sm text-secondary font-inter mt-1">
                            Daftar ruang kelas Smart Classroom.
                        </p>
                    </div>

                    {/* Rooms */}
                    <div className="grid grid-cols-1 gap-5">

                        <Link href="/rooms/roomDetails" className="clay-card-sm p-5 block">
                            <h1 className="font-semibold text-foreground font-inter text-lg">
                                Ruang C1-1
                            </h1>

                            <p className="text-sm text-secondary mt-1">
                                Lantai 1 - Gedung C
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                                <div className={motion ? "clay-badge-green" : "clay-badge-red"}>
                                    {motion ? <MdPerson size={18} /> : <MdPersonOff size={18} />}
                                    {motion ? "Gerakan Terdeteksi" : "Tidak Ada Gerakan"}
                                </div>
                            </div>
                        </Link>

                        <div className="clay-card-sm p-5">
                            <h1 className="font-semibold text-foreground font-inter text-lg">
                                Ruang C1-1
                            </h1>

                            <p className="text-sm text-secondary mt-1">
                                Lantai 1
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                                <div className="clay-badge-red">
                                    <MdPersonOff size={18} />
                                    Tidak ada gerakan
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </ProtectedRoute>
    )
}