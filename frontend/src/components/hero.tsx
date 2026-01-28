"use client"

import MagnetLines from "@/components/MagnetLines";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Hero() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getLineColor = () => {
        if (!mounted) return "oklch(0.3 0 0)";

        switch (theme) {
            case "milk":
                return "oklch(0.7 0 0)";
            case "dark":
                return "oklch(0.4 0 0)";
            case "mint":
                return "oklch(0.7 0.03 150)";
            case "salmon":
                return "oklch(0.7 0.04 50)";
            default:
                return "oklch(0.3 0 0)";
        }
    };

    return (
        <section className="relative border-b-2 border-border overflow-hidden">
            {/* Magnet Lines Effect
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <MagnetLines
                    rows={8}
                    columns={24}
                    containerSize="100%"
                    lineColor={getLineColor()}
                    lineWidth="2px"
                    lineHeight="40px"
                    baseAngle={0}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
            */}

            <div className="relative container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6">
                        Built by Us.
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-mono leading-relaxed max-w-2xl">
                        Open source projects, experiments, and tools crafted by and for the IIIT Hyderabad community.
                    </p>
                    <div className="mt-8 flex gap-4 font-mono text-sm">
                        <div className="border-2 px-4 py-2">
                            <span className="text-muted-foreground">Projects:</span>{" "}
                            <span className="font-bold">67</span>
                        </div>
                        <div className="border-2 px-4 py-2">
                            <span className="text-muted-foreground">Contributors:</span>{" "}
                            <span className="font-bold">248</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
