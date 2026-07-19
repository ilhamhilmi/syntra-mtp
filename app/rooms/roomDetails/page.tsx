"use client"

import DockClient from "@/components/dock/DockClient/page"
import Switch from "@/components/switch/page"
import { useEffect, useState } from "react"
import { ref, onValue, set } from "firebase/database"
import { db } from "@/lib/firebase"
import ProtectedRoute from "@/components/protect/ProtectedRoute"
import { MdPerson, MdPersonOff } from "react-icons/md"

export default function RoomDetails() {
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

    const updateDevice = async (
        device: "lamp1" | "lamp2" | "lamp3"
    ) => {
        await set(
            ref(db, `devices/${device}`),
            !devices[device]
        );
    };

    return (
        <ProtectedRoute>
            <DockClient />

            <section className="min-h-screen px-4 py-8 pb-24">
                <div className="container mx-auto max-w-md">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-foreground font-inter">
                            Ruang C1-1
                        </h1>

                        <p className="text-sm text-secondary font-inter mt-1">
                            Lantai 1 - Gedung C
                        </p>
                    </div>

                    {/* Motion Status */}
                    <div className="clay-card-sm p-5 mb-5">
                        <p className="text-sm text-secondary font-inter">
                            Status Gerakan
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                            <div className={motion ? "clay-badge-green" : "clay-badge-red"}>
                                {motion ? <MdPerson size={18} /> : <MdPersonOff size={18} />}
                                {motion ? "Gerakan Terdeteksi" : "Tidak Ada Gerakan"}
                            </div>
                        </div>
                    </div>

                    {/* Device Control */}
                    <div className="clay-card-sm p-5">

                        <h2 className="font-semibold text-foreground mb-5 font-inter text-lg">
                            Kontrol Perangkat
                        </h2>

                        <div className="clay-divider" />

                        {/* Lampu */}
                        <div className="flex items-center justify-between py-3 font-inter text-foreground">
                            <span className="font-medium">Lampu Kelas</span>
                            <Switch
                                checked={devices.lamp1}
                                onChange={() => updateDevice("lamp1")}
                            />
                        </div>

                        <div className="clay-divider" />

                        {/* Tv */}
                        <div className="flex items-center justify-between py-3 font-inter text-foreground">
                            <span className="font-medium">Smart TV</span>
                            <button>
                                <Switch
                                    checked={devices.lamp2}
                                    onChange={() => updateDevice("lamp2")}
                                />
                            </button>
                        </div>

                        <div className="clay-divider" />

                        {/* AC */}
                        <div className="flex items-center justify-between py-3 font-inter text-foreground">
                            <span className="font-medium">AC</span>
                            <Switch
                                checked={devices.lamp3}
                                onChange={() => updateDevice("lamp3")}
                            />
                        </div>

                    </div>

                </div>
            </section>
        </ProtectedRoute>
    )
}