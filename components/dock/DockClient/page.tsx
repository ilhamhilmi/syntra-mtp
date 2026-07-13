"use client"

import Dock from "@/components/dock/Dock";
import { useRouter } from "next/navigation";
import { VscHome, VscAccount} from "react-icons/vsc"
import { MdMeetingRoom } from "react-icons/md";


export default function DockClient() {

    const router = useRouter()

    const items = [
        {
            icon: <VscHome className="text-black" size={20} />,
            label: 'Beranda',
            onClick: () => router.push("/"),
        },
        { icon: <MdMeetingRoom className="text-black" size={20} />, label: 'Ruangan', onClick: () => router.push("/rooms") },
        { icon: <VscAccount href="/user-profile" className="text-black" size={20} />, label: 'Akun', onClick: () => router.push("/userProfile") },
    ];
    return (
        <div>
            <Dock
                items={items}
                panelHeight={70}
                baseItemSize={50}
                magnification={75}
            />
        </div>
    )
}