"use client"

import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
    return (
        <header className="border-b-2 border-border">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
                <div>
                    <h1 className="text-xl font-bold uppercase tracking-wider">Projects Showcase</h1>
                    <p className="text-xs text-muted-foreground font-mono">IIIT Hyderabad</p>
                </div>

                <ModeToggle />
            </div>
        </header>
    );
}
