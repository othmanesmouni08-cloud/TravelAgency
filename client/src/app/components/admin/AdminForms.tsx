import { useForm } from 'react-hook-form';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';

// --- Hotels ---
export interface HotelFormData {
    name: string;
    location: string;
    price: number;
    rating: number;
    status: 'Active' | 'Inactive';
}

export function HotelForm({ onSubmit, initialData }: { onSubmit: (data: HotelFormData) => void, initialData?: HotelFormData }) {
    const { register, handleSubmit, setValue, watch } = useForm<HotelFormData>({
        defaultValues: initialData || { status: 'Active', rating: 5 }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Hotel Name</Label>
                <Input id="name" {...register('name', { required: true })} placeholder="e.g. Riad Al-Oujda" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register('location', { required: true })} placeholder="e.g. Oujda Medina" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Price/Night (MAD)</Label>
                    <Input id="price" type="number" {...register('price', { required: true, valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input id="rating" type="number" step="0.1" min="1" max="5" {...register('rating', { required: true, valueAsNumber: true })} />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Status</Label>
                <Select onValueChange={(v: any) => setValue('status', v)} defaultValue={watch('status')}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">Save Hotel</Button>
        </form>
    );
}

// --- Cars ---
export interface CarFormData {
    brand: string;
    model: string;
    type: string;
    price: number;
    seats: number;
    transmission: 'Manual' | 'Automatic';
    imageUrl?: string;
    available?: boolean;
}

export function CarForm({ onSubmit, initialData }: { onSubmit: (data: CarFormData) => void, initialData?: CarFormData }) {
    const { register, handleSubmit, setValue, watch } = useForm<CarFormData>({
        defaultValues: initialData || { transmission: 'Manual', seats: 5, available: true }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit, (errors) => {
            console.error("CarForm Validation Errors:", errors);
            alert(`Validation Error: ${JSON.stringify(errors)}`);
        })} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" {...register('brand', { required: true })} placeholder="e.g. Dacia" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" {...register('model', { required: true })} placeholder="e.g. Logan" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="type">Type/Category</Label>
                <Input id="type" {...register('type', { required: true })} placeholder="e.g. Economy, SUV" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Price/Day (MAD)</Label>
                    <Input id="price" type="number" {...register('price', { required: true, valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="seats">Seats</Label>
                    <Input id="seats" type="number" {...register('seats', { required: true, valueAsNumber: true })} />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Transmission</Label>
                <Select onValueChange={(v: any) => setValue('transmission', v)} defaultValue={watch('transmission')}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" {...register('imageUrl')} placeholder="https://..." />
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="available"
                    {...register('available')}
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <Label htmlFor="available">Available for Booking</Label>
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">Save Car</Button>
        </form>
    );
}

// --- Activities ---
export interface ActivityFormData {
    title: string;
    category: string;
    price: number;
    duration: string;
}

export function ActivityForm({ onSubmit, initialData }: { onSubmit: (data: ActivityFormData) => void, initialData?: ActivityFormData }) {
    const { register, handleSubmit } = useForm<ActivityFormData>({
        defaultValues: initialData
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Activity Title</Label>
                <Input id="title" {...register('title', { required: true })} placeholder="e.g. Desert Safari" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register('category', { required: true })} placeholder="e.g. Adventure, Culture" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Price (MAD)</Label>
                    <Input id="price" type="number" {...register('price', { required: true, valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" {...register('duration', { required: true })} placeholder="e.g. 4 hours" />
                </div>
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">Save Activity</Button>
        </form>
    );
}

// --- Packages (Destinations) ---
export interface PackageFormData {
    name: string;
    description: string;
    image: string;
    rating: number;
    highlights: string; // Comma separated for simplicity in form
}

export function PackageForm({ onSubmit, initialData }: { onSubmit: (data: PackageFormData) => void, initialData?: PackageFormData }) {
    const { register, handleSubmit } = useForm<PackageFormData>({
        defaultValues: initialData || { rating: 5 }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Destination Name</Label>
                <Input id="name" {...register('name', { required: true })} placeholder="e.g. Oujda" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description', { required: true })} placeholder="Brief overview of the destination..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" {...register('image', { required: true })} placeholder="https://..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input id="rating" type="number" step="0.1" min="1" max="5" {...register('rating', { required: true, valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="highlights">Highlights (comma separated)</Label>
                <Input id="highlights" {...register('highlights', { required: true })} placeholder="e.g. Beach, Culture, Food" />
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">Save Destination</Button>
        </form>
    );
}

// --- Services ---
export interface ServiceFormData {
    title: string;
    description: string;
    image: string;
    features: string; // Comma separated
    page: string;
}

export function ServiceForm({ onSubmit, initialData }: { onSubmit: (data: ServiceFormData) => void, initialData?: ServiceFormData }) {
    const { register, handleSubmit } = useForm<ServiceFormData>({
        defaultValues: initialData
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input id="title" {...register('title', { required: true })} placeholder="e.g. Luxury Car Rental" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description', { required: true })} placeholder="Broad description of the service..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" {...register('image', { required: true })} placeholder="https://..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input id="features" {...register('features', { required: true })} placeholder="e.g. SUVs, 4x4s, With Driver" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="page">Page Link (Page ID)</Label>
                <Input id="page" {...register('page', { required: true })} placeholder="e.g. cars, hotels, activities" />
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">Save Service</Button>
        </form>
    );
}
