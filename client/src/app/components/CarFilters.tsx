import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Slider } from "@/app/components/ui/slider";

export interface FilterState {
    brand: string;
    priceRange: [number, number];
    transmission: string;
    seats: string;
}

interface CarFiltersProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    brands: string[];
    maxPrice: number;
}

export function CarFilters({
    filters,
    setFilters,
    brands,
    maxPrice,
}: CarFiltersProps) {
    const handlePriceChange = (value: number[]) => {
        setFilters({
            ...filters,
            priceRange: [value[0], value[1]],
        });
    };

    const activeFiltersCount = [
        filters.brand !== "all",
        filters.transmission !== "all",
        filters.seats !== "any",
        filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice,
    ].filter(Boolean).length;

    const resetFilters = () => {
        setFilters({
            brand: "all",
            priceRange: [0, maxPrice],
            transmission: "all",
            seats: "any",
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg">
                <div className="flex flex-col gap-6">

                    <div className="flex justify-between items-center md:hidden">
                        <h2 className="text-xl text-white font-semibold flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-cyan-400" /> Filters
                        </h2>
                        {activeFiltersCount > 0 && (
                            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                                {activeFiltersCount} Active
                            </Badge>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

                        {/* Brand Filter */}
                        <div className="space-y-2">
                            <label className="text-sm text-teal-100/80 font-medium">Brand</label>
                            <Select
                                value={filters.brand}
                                onValueChange={(value) =>
                                    setFilters({ ...filters, brand: value })
                                }
                            >
                                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-cyan-500/50 hover:bg-white/10 transition-colors">
                                    <SelectValue placeholder="All Brands" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="all">All Brands</SelectItem>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand} value={brand}>
                                            {brand}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price Filter (Slider) */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm text-teal-100/80 font-medium">
                                <span>Price Range</span>
                                <span>{filters.priceRange[0]} - {filters.priceRange[1]} MAD</span>
                            </div>
                            <Slider
                                defaultValue={[0, maxPrice]}
                                value={[filters.priceRange[0], filters.priceRange[1]]}
                                max={maxPrice}
                                step={10}
                                min={0}
                                onValueChange={handlePriceChange}
                                className="py-4"
                            />
                        </div>

                        {/* Transmission Filter */}
                        <div className="space-y-2">
                            <label className="text-sm text-teal-100/80 font-medium">
                                Transmission
                            </label>
                            <Select
                                value={filters.transmission}
                                onValueChange={(value) =>
                                    setFilters({ ...filters, transmission: value })
                                }
                            >
                                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-cyan-500/50 hover:bg-white/10 transition-colors">
                                    <SelectValue placeholder="Any" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="all">Any</SelectItem>
                                    <SelectItem value="Manual">Manual</SelectItem>
                                    <SelectItem value="Automatic">Automatic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Seats Filter */}
                        <div className="space-y-2">
                            <label className="text-sm text-teal-100/80 font-medium">
                                Seats
                            </label>
                            <Select
                                value={filters.seats}
                                onValueChange={(value) =>
                                    setFilters({ ...filters, seats: value })
                                }
                            >
                                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-cyan-500/50 hover:bg-white/10 transition-colors">
                                    <SelectValue placeholder="Any" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="any">Any</SelectItem>
                                    <SelectItem value="2">2+ Seats</SelectItem>
                                    <SelectItem value="4">4+ Seats</SelectItem>
                                    <SelectItem value="5">5+ Seats</SelectItem>
                                    <SelectItem value="7">7+ Seats</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    {/* Reset Button - Only show if filters are active */}
                    {activeFiltersCount > 0 && (
                        <div className="flex justify-end">
                            <Button
                                variant="ghost"
                                onClick={resetFilters}
                                className="text-teal-200 hover:text-white hover:bg-white/10"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Reset Filters
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
