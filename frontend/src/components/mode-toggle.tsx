"use client"

import { Sun, Moon, Sprout, Fish, FishSymbol } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const themes = [
    { name: "milk", icon: Sun, label: "Milk" },
    { name: "dark", icon: Moon, label: "Coal" },
    { name: "mint", icon: Sprout, label: "Mint" },
    { name: "salmon", icon: FishSymbol, label: "Salmon" },
];

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="border-2">
                <Button variant="ghost" size="icon" className="relative z-10">
                    <Sun className="h-4 w-4" />
                </Button>
            </div>
        );
    }

    const currentThemeIndex = themes.findIndex((t) => t.name === theme);
    const CurrentIcon = themes[currentThemeIndex]?.icon || Sun;

    const otherThemes = themes.filter((t) => t.name !== theme);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="flex items-center border-2 overflow-hidden">
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="flex"
                        >
                            {otherThemes.map((t, index) => {
                                const Icon = t.icon;
                                return (
                                    <motion.div
                                        key={t.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.15, delay: index * 0.05 }}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setTheme(t.name)}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    variant="ghost"
                    size="icon"
                    className="relative z-10"
                >
                    <CurrentIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </div>
    );
}
