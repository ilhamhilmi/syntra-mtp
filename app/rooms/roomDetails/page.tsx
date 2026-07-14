"use client"

import DockClient from "@/components/dock/DockClient/page"
import Switch from "@/components/switch/page"
import { useEffect, useState } from "react"
import { ref, onValue, set } from "firebase/database"
import { db } from "@/lib/firebase"
import ProtectedRoute from "@/components/protect/ProtectedRoute"

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

            <section className="min-h-screen bg-slate-100 px-4 py-8 pb-24">
                <div className="container mx-auto max-w-md">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 font-inter">
                            Ruang C1-1
                        </h1>

                        <p className="text-sm text-secondary font-inter">
                            Lantai 1 - Gedung C
                        </p>
                    </div>

                    {/* Motion Status */}
                    <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm mb-4">
                        <p className="text-sm text-secondary font-inter">
                            Status Gerakan
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                            <div
                                className={`px-3 py-1 rounded-md text-white text-sm font-inter ${motion ? "bg-green-500" : "bg-red-500"
                                    }`}
                            >
                                {motion ? "Gerakan Terdeteksi" : "Tidak Ada Gerakan"}
                            </div>
                        </div>
                    </div>

                    {/* Device Control */}
                    <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">

                        <h2 className="font-semibold text-gray-800 mb-5 font-inter">
                            Kontrol Perangkat
                        </h2>

                        {/* Lampu */}
                        <div className="flex items-center justify-between py-3 border-b border-gray-100 font-inter text-black">
                            <span>Lampu Kelas</span>

                            <Switch
                                checked={devices.lamp1}
                                onChange={() => updateDevice("lamp1")}
                            />
                        </div>

                        {/* Tv */}
                        <div className="flex items-center justify-between py-3 border-b border-gray-100 font-inter text-black">
                            <span>Smart TV</span>

                            <button>
                                <Switch
                                    checked={devices.lamp2}
                                    onChange={() => updateDevice("lamp2")}
                                />
                            </button>
                        </div>

                        {/* AC */}
                        <div className="flex items-center justify-between py-3 font-inter text-black">
                            <span>AC</span>

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