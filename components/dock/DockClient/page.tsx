"use client"

import Dock from "@/components/dock/Dock";
import { useRouter, usePathname } from "next/navigation";
import { VscHome, VscAccount} from "react-icons/vsc"
import { MdMeetingRoom } from "react-icons/md";


export default function DockClient() {

    const router = useRouter()
    const pathname = usePathname()

    const items = [
        {
            icon: <VscHome className="text-inherit" size={20} />,
            label: 'Beranda',
            onClick: () => router.push("/"),
            isActive: pathname === "/",
        },
        {
            icon: <MdMeetingRoom className="text-inherit" size={20} />,
            label: 'Ruangan',
            onClick: () => router.push("/rooms"),
            isActive: pathname === "/rooms" || pathname.startsWith("/rooms/"),
        },
        {
            icon: <VscAccount className="text-inherit" size={20} />,
            label: 'Akun',
            onClick: () => router.push("/userProfile"),
            isActive: pathname === "/userProfile",
        },
    ];
    return (
        <div>
            <Dock
                items={items}
            />
        </div>
    )
}