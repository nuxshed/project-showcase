"use client"

import { ModeToggle } from "@/components/mode-toggle";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useQueryState("q", { defaultValue: "" });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && !isSearchOpen && document.activeElement?.tagName !== "INPUT") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === "Escape" && isSearchOpen) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isSearchOpen]);

    useEffect(() => {
        if (isSearchOpen) {
            const input = document.getElementById("search-input");
            input?.focus();
        }
    }, [isSearchOpen]);

    return (
        <header className="border-b-2 border-border">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
                <div>
                    <h1 className="text-xl font-bold uppercase tracking-wider">Projects Showcase</h1>
                    <p className="text-xs text-muted-foreground font-mono">IIIT Hyderabad</p>
                </div>

                <div className="flex items-center gap-2">
                    {isSearchOpen ? (
                        <div className="flex items-center gap-2 border-2 px-3 py-1">
                            <Search className="h-3 w-3 text-muted-foreground" />
                            <Input
                                id="search-input"
                                type="text"
                                placeholder="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-0 h-6 w-48 p-0 focus-visible:ring-0 font-mono text-xs !bg-background"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(false)}
                                className="h-6 w-6 p-0"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSearchOpen(true)}
                            className="text-muted-foreground"
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
