"use client";

import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "@/lib/firebase";

export default function Home() {
  const [devices, setDevices] = useState({
    lamp1: false,
    lamp2: false,
    lamp3: false,
  });

  useEffect(() => {
    const devicesRef = ref(db, "devices");

    const unsubscribe = onValue(devicesRef, (snapshot) => {
      if (snapshot.exists()) {
        setDevices(snapshot.val());
        console.log(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, []);

  const writeData = async () => {
    await set(ref(db, "devices/lamp1"), !devices.lamp1);

    console.log("Berhasil");
  };

  return (
    <div className="p-5">
      <button
        onClick={writeData}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {devices.lamp1 ? "Lamp1 OFF" : "Lamp1 ON"}
      </button>

      <div className="mt-5">
        <p>Lamp 1 : {devices.lamp1 ? "ON" : "OFF"}</p>
        <p>Lamp 2 : {devices.lamp2 ? "ON" : "OFF"}</p>
        <p>Lamp 3 : {devices.lamp3 ? "ON" : "OFF"}</p>
      </div>
    </div>
  );
}