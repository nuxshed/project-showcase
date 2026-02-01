"use client";

import { useQueryState } from "nuqs";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import React, { useState, useEffect } from "react";

interface FilterBarProps {
    allTags: string[];
}

export function FilterBar({ allTags }: FilterBarProps) {
    const [searchQuery, setSearchQuery] = useQueryState("q", { defaultValue: "" });
    const [selectedTag, setSelectedTag] = useQueryState("tag");
    const [mounted, setMounted] = useState(false);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };


        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleScroll = () => {
        if (window.scrollY < 50) {
            const filterBar = document.getElementById("filter-bar");
            filterBar?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };


    if (!mounted) {
        return (
            <div className="bg-background sticky top-0 z-20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex gap-4 items-center justify-between">
                        <div className="flex items-center gap-2 border-2 px-3 py-2 w-80 h-10" />
                        <div className="w-64 h-10 border-2" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="filter-bar" className="bg-background sticky top-0 z-20">
            <div className="container mx-auto px-4 py-4">
                <div className="flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 border-2 px-3 py-2 w-80 h-10">
                        <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="search projects"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                handleScroll();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    e.currentTarget.blur();
                                }
                            }}
                            className="border-0 h-6 p-0 focus-visible:ring-0 font-mono text-sm !bg-background"
                        />
                        {searchQuery && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSearchQuery("")}
                                className="h-6 w-6 p-0 flex-shrink-0"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </div>

                    <Combobox
                        items={allTags}
                        value={selectedTag ?? ""}
                        onValueChange={(value) => setSelectedTag(value || null)}
                        autoHighlight
                    >
                        <ComboboxInput
                            placeholder="filter by tag"
                            className="w-64 font-mono text-sm border-2 h-10 focus-visible:ring-0 focus-visible:ring-offset-0 !border-border"
                            showClear={!!selectedTag}
                        />
                        <ComboboxContent className="border-2">
                            <ComboboxEmpty>No tags found.</ComboboxEmpty>
                            <ComboboxList>
                                {(tag) => (
                                    <ComboboxItem key={tag} value={tag} className="font-mono text-sm">
                                        {tag}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
            </div>
        </div>
    );
}
