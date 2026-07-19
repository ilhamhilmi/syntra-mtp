'use client';

import React from 'react';

export type DockItemData = {
    icon: React.ReactNode;
    label: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
};

export type DockProps = {
    items: DockItemData[];
    className?: string;
};

export default function Dock({
    items,
    className = '',
}: DockProps) {
    return (
        <nav className={`fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 ${className}`}>
            <div className="clay-dock-panel mx-auto max-w-sm flex items-center justify-around px-2 py-2">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.onClick}
                        className={`
                            flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl
                            transition-all duration-200 cursor-pointer border-none
                            ${item.isActive
                                ? 'clay-card-pressed-sm text-primary'
                                : 'text-secondary hover:text-foreground'
                            }
                        `}
                    >
                        <div className={`transition-transform duration-200 ${item.isActive ? 'scale-110' : ''}`}>
                            {item.icon}
                        </div>
                        <span className={`text-[10px] font-inter ${item.isActive ? 'font-semibold text-primary' : 'font-medium'}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    );
}