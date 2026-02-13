import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import {
    LayoutDashboard,
    Hotel,
    Car,
    Palmtree as Activities,
    Users,
    CreditCard,
    BarChart3,
    Plus,
    Search,
    TrendingUp,
    Package,
    CalendarDays,
    Trash2,
    Edit3,
    MapPin,
    Sparkles,
    LogOut,
    Home,
    Menu,
    X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog";
import {
    HotelForm,
    CarForm,
    ActivityForm,
    PackageForm,
    ServiceForm
} from './admin/AdminForms';

type AdminSection = 'overview' | 'hotels' | 'cars' | 'activities' | 'bookings' | 'packages' | 'services';

export function AdminDashboard() {
    const [activeSection, setActiveSection] = useState<AdminSection>('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<{ id: string; data: any } | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleSectionChange = (section: AdminSection) => {
        setActiveSection(section);
        setIsSidebarOpen(false);
    };

    // Simulated Data
    const [hotels, setHotels] = useState([
        { id: 'h1', name: 'Riad Al-Oujda', location: 'Oujda Medina', price: 850, rating: 4.8, status: 'Active' },
        { id: 'h2', name: 'Figuig Oasis Resort', location: 'Figuig', price: 1200, rating: 4.9, status: 'Active' },
        { id: 'h3', name: 'Saïdia Beach Hotel', location: 'Saïdia', price: 1500, rating: 4.6, status: 'Inactive' },
        { id: 'h4', name: 'Berkane Garden Riad', location: 'Berkane', price: 750, rating: 4.5, status: 'Active' },
    ]);

    const [cars, setCars] = useState([
        { id: 'c1', name: 'Dacia Logan', type: 'Economy', price: 250, seats: 5, transmission: 'Manual' },
        { id: 'c2', name: 'Volkswagen Tiguan', type: 'Compact SUV', price: 450, seats: 5, transmission: 'Automatic' },
        { id: 'c3', name: 'Range Rover Sport', type: '4x4 SUV', price: 650, seats: 7, transmission: 'Automatic' },
        { id: 'c4', name: 'Mercedes-Benz S-Class', type: 'Luxury', price: 950, seats: 5, transmission: 'Automatic' },
        { id: 'c5', name: 'Mercedes V-Class Chauffeur', type: 'Premium', price: 1500, seats: 4, transmission: 'Automatic' },
    ]);

    const [activities, setActivities] = useState([
        { id: 'a1', title: 'Desert Safari', category: 'Adventure', price: 850, duration: '6 hours' },
        { id: 'a2', title: 'Oujda City Tour', category: 'Culture', price: 350, duration: '4 hours' },
        { id: 'a3', title: 'Cooking Class', category: 'Food', price: 450, duration: '3 hours' },
    ]);

    const [bookings, setBookings] = useState([
        { id: 'b1', customer: 'Sarah Johnson', item: 'Riad Al-Oujda', date: 'Oct 24, 2026', amount: '4,250 MAD', status: 'Confirmed' },
        { id: 'b2', customer: 'Marc Durand', item: '4x4 Atlas Explorer', date: 'Oct 23, 2026', amount: '1,200 MAD', status: 'Pending' },
        { id: 'b3', customer: 'Yassine Benali', item: 'Desert Safari Tour', date: 'Oct 23, 2026', amount: '850 MAD', status: 'Confirmed' },
    ]);

    const [packages, setPackages] = useState([
        { id: 'p1', name: 'Oujda', description: 'The gateway to Eastern Morocco with beautiful architecture and vibrant culture', image: 'https://images.unsplash.com/photo-1716302235543-5517c070ad35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwb3VqZGElMjBjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 4.7, highlights: 'Historic Medina, French Architecture, Local Markets' },
        { id: 'p2', name: 'Saidia', description: 'Blue Pearl of the Mediterranean with 14km of pristine beaches', image: 'https://images.unsplash.com/photo-1707400015348-b0a5851ab163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwYmx1ZSUyMGNpdHklMjBjaGVmY2hhb3VlbnxlbnwxfHx8fDE3Njk3MDIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 4.9, highlights: 'Beach Resort, Water Sports, Marina' },
        { id: 'p3', name: 'Figuig', description: 'Ancient oasis with 200,000 palm trees and seven traditional ksour', image: 'https://images.unsplash.com/photo-1644028735064-4b124c4f7f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwZmlndWlnJTIwb2FzaXMlMjBwYWxtfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 4.8, highlights: 'Palm Oasis, Ancient Ksour, Desert Gateway' },
    ]);

    const [servicesData, setServicesData] = useState([
        { id: 's1', title: 'Luxury Car Rental', description: 'Explore Eastern Morocco with our premium fleet...', image: 'https://images.unsplash.com/...', features: 'SUVs & 4x4s, Luxury Sedans', page: 'cars' },
        { id: 's2', title: 'Authentic Hotels & Riads', description: 'Stay in Eastern Morocco\'s finest accommodations...', image: 'https://images.unsplash.com/...', features: 'Traditional Riads, Beach Resorts', page: 'hotels' },
    ]);

    const handleDelete = (id: string, section: AdminSection) => {
        if (confirm('Are you sure you want to delete this item?')) {
            if (section === 'hotels') setHotels(hotels.filter(h => h.id !== id));
            if (section === 'cars') setCars(cars.filter(c => c.id !== id));
            if (section === 'activities') setActivities(activities.filter(a => a.id !== id));
            if (section === 'bookings') setBookings(bookings.filter(b => b.id !== id));
            if (section === 'packages') setPackages(packages.filter(p => p.id !== id));
            if (section === 'services') setServicesData(servicesData.filter(s => s.id !== id));
            toast.success('Item deleted successfully');
        }
    };

    const handleFormSubmit = (data: any) => {
        if (editingItem) {
            // Update
            if (activeSection === 'hotels') setHotels(hotels.map(h => h.id === editingItem.id ? { ...h, ...data } : h));
            if (activeSection === 'cars') setCars(cars.map(c => c.id === editingItem.id ? { ...c, ...data } : c));
            if (activeSection === 'activities') setActivities(activities.map(a => a.id === editingItem.id ? { ...a, ...data } : a));
            if (activeSection === 'packages') setPackages(packages.map(p => p.id === editingItem.id ? { ...p, ...data } : p));
            if (activeSection === 'services') setServicesData(servicesData.map(s => s.id === editingItem.id ? { ...s, ...data } : s));
            toast.success('Item updated successfully');
        } else {
            // Create
            const id = Math.random().toString(36).substr(2, 9);
            if (activeSection === 'hotels') setHotels([...hotels, { id, ...data }]);
            if (activeSection === 'cars') setCars([...cars, { id, ...data }]);
            if (activeSection === 'activities') setActivities([...activities, { id, ...data }]);
            if (activeSection === 'packages') setPackages([...packages, { id, ...data }]);
            if (activeSection === 'services') setServicesData([...servicesData, { id, ...data }]);
            toast.success('Item added successfully');
        }
        setIsDialogOpen(false);
        setEditingItem(null);
    };

    const handleEdit = (item: any) => {
        setEditingItem({ id: item.id, data: item });
        setIsDialogOpen(true);
    };

    const stats = [
        { title: 'Total Revenue', value: '128,450 MAD', icon: CreditCard, change: '+12.5%', color: 'border-teal-500' },
        { title: 'New Bookings', value: '42', icon: LayoutDashboard, change: '+8.2%', color: 'border-cyan-500' },
        { title: 'Active Listings', value: '24', icon: Package, change: '0%', color: 'border-teal-600' },
        { title: 'Happy Customers', value: '1,250', icon: Users, change: '+15.3%', color: 'border-cyan-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar Toggle */}
            <button
                onClick={toggleSidebar}
                className="fixed top-6 left-6 z-[60] p-2 bg-teal-900 text-white rounded-lg shadow-xl hover:bg-teal-800 transition-colors"
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar with Transition */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -260, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -260, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="w-64 bg-teal-900 text-white fixed h-full pt-20 z-50 shadow-2xl"
                    >
                        <div className="px-6 py-8 flex flex-col h-full bg-teal-900/40 backdrop-blur-xl">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-2 text-teal-200 uppercase tracking-widest">
                                Back Office
                            </h2>
                            <nav className="space-y-3 flex-grow overflow-y-auto custom-scrollbar pr-2">
                                <SidebarLink icon={LayoutDashboard} label="Overview" active={activeSection === 'overview'} onClick={() => handleSectionChange('overview')} />
                                <SidebarLink icon={Sparkles} label="Agency Services" active={activeSection === 'services'} onClick={() => handleSectionChange('services')} />
                                <SidebarLink icon={MapPin} label="Packages" active={activeSection === 'packages'} onClick={() => handleSectionChange('packages')} />
                                <SidebarLink icon={Hotel} label="Hotels" active={activeSection === 'hotels'} onClick={() => handleSectionChange('hotels')} />
                                <SidebarLink icon={Car} label="Cars" active={activeSection === 'cars'} onClick={() => handleSectionChange('cars')} />
                                <SidebarLink icon={Activities} label="Activities" active={activeSection === 'activities'} onClick={() => handleSectionChange('activities')} />
                                <SidebarLink icon={CalendarDays} label="Bookings" active={activeSection === 'bookings'} onClick={() => handleSectionChange('bookings')} />
                            </nav>
                            <div className="mt-auto pt-8 border-t border-teal-800/50 space-y-3">
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-teal-200 hover:bg-white/10 hover:text-white group"
                                >
                                    <div className="p-2 rounded-lg bg-teal-800 group-hover:bg-teal-700 transition-colors">
                                        <Home className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Back to Site</span>
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-300 hover:bg-red-500/10 hover:text-red-200 group"
                                >
                                    <div className="p-2 rounded-lg bg-red-900/50 group-hover:bg-red-900 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Log Out</span>
                                </button>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-500 ml-0 pt-24 p-8`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 capitalize">
                                {activeSection} Management
                            </h1>
                            <p className="text-gray-500">Welcome back, Admin. Manage your agency's assets.</p>
                        </div>
                        {['hotels', 'cars', 'activities', 'packages', 'services'].includes(activeSection) && (
                            <Dialog open={isDialogOpen} onOpenChange={(open) => {
                                setIsDialogOpen(open);
                                if (!open) setEditingItem(null);
                            }}>
                                <DialogTrigger asChild>
                                    <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add New {activeSection.slice(0, -1)}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>{editingItem ? 'Edit' : 'Add New'} {activeSection.slice(0, -1)}</DialogTitle>
                                    </DialogHeader>
                                    {activeSection === 'hotels' && <HotelForm onSubmit={handleFormSubmit} initialData={editingItem?.data} />}
                                    {activeSection === 'cars' && <CarForm onSubmit={handleFormSubmit} initialData={editingItem?.data} />}
                                    {activeSection === 'activities' && <ActivityForm onSubmit={handleFormSubmit} initialData={editingItem?.data} />}
                                    {activeSection === 'packages' && <PackageForm onSubmit={handleFormSubmit} initialData={editingItem?.data} />}
                                    {activeSection === 'services' && <ServiceForm onSubmit={handleFormSubmit} initialData={editingItem?.data} />}
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>

                    {activeSection === 'overview' && (
                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat) => (
                                    <Card key={stat.title} className={`border-l-4 ${stat.color}`}>
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2 bg-gray-50 rounded-lg">
                                                    <stat.icon className="w-6 h-6 text-teal-600" />
                                                </div>
                                                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                                                    <TrendingUp className="w-4 h-4" />
                                                    {stat.change}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <Card className="border-teal-100">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-teal-600" />
                                        Important Alerts
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg">
                                            <div className="w-2 h-2 rounded-full bg-teal-500" />
                                            <p className="text-sm text-teal-900 font-medium">New booking from Sarah Johnson needs confirmation.</p>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg">
                                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                                            <p className="text-sm text-amber-900 font-medium">Inventory alert: Economy cars running low for Saïdia.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeSection !== 'overview' && (
                        <Card className="border-teal-100">
                            <CardContent className="p-0">
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                    <div className="relative w-96">
                                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder={`Search ${activeSection}...`}
                                            className="pl-10 border-gray-200 focus:ring-teal-500"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Filter</Button>
                                        <Button variant="outline" size="sm">Export CSV</Button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        {activeSection === 'services' && (
                                            <>
                                                <thead className="bg-gray-50 border-y border-gray-100 italic text-xs uppercase text-gray-400 font-bold">
                                                    <tr>
                                                        <th className="px-6 py-4">Title</th>
                                                        <th className="px-6 py-4">Description</th>
                                                        <th className="px-6 py-4">Target Page</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {servicesData.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())).map(service => (
                                                        <tr key={service.id} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                                                            <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{service.description}</td>
                                                            <td className="px-6 py-4 text-gray-500">{service.page}</td>
                                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}><Edit3 className="w-4 h-4 text-teal-600" /></Button>
                                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id, 'services')}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </>
                                        )}

                                        {activeSection === 'hotels' && (
                                            <>
                                                <thead className="bg-gray-50 border-y border-gray-100 italic text-xs uppercase text-gray-400 font-bold">
                                                    <tr>
                                                        <th className="px-6 py-4">Name</th>
                                                        <th className="px-6 py-4">Location</th>
                                                        <th className="px-6 py-4">Price/Night</th>
                                                        <th className="px-6 py-4">Rating</th>
                                                        <th className="px-6 py-4">Status</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {hotels.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase())).map(hotel => (
                                                        <tr key={hotel.id} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{hotel.name}</td>
                                                            <td className="px-6 py-4 text-gray-600">{hotel.location}</td>
                                                            <td className="px-6 py-4 font-bold text-teal-900">{hotel.price} MAD</td>
                                                            <td className="px-6 py-4 text-gray-500">{hotel.rating} ⭐</td>
                                                            <td className="px-6 py-4">
                                                                <Badge className={hotel.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                                                                    {hotel.status}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(hotel)}><Edit3 className="w-4 h-4 text-teal-600" /></Button>
                                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(hotel.id, 'hotels')}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </>
                                        )}

                                        {activeSection === 'cars' && (
                                            <>
                                                <thead className="bg-gray-50 border-y border-gray-100 italic text-xs uppercase text-gray-400 font-bold">
                                                    <tr>
                                                        <th className="px-6 py-4">Model</th>
                                                        <th className="px-6 py-4">Type</th>
                                                        <th className="px-6 py-4">Price/Day</th>
                                                        <th className="px-6 py-4">Seats</th>
                                                        <th className="px-6 py-4">Transmission</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {cars.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(car => (
                                                        <tr key={car.id} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{car.name}</td>
                                                            <td className="px-6 py-4 text-gray-600">{car.type}</td>
                                                            <td className="px-6 py-4 font-bold text-teal-900">{car.price} MAD</td>
                                                            <td className="px-6 py-4 text-gray-500">{car.seats}</td>
                                                            <td className="px-6 py-4 text-gray-500">{car.transmission}</td>
                                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(car)}><Edit3 className="w-4 h-4 text-teal-600" /></Button>
                                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(car.id, 'cars')}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </>
                                        )}

                                        {activeSection === 'activities' && (
                                            <>
                                                <thead className="bg-gray-50 border-y border-gray-100 italic text-xs uppercase text-gray-400 font-bold">
                                                    <tr>
                                                        <th className="px-6 py-4">Title</th>
                                                        <th className="px-6 py-4">Category</th>
                                                        <th className="px-6 py-4">Price</th>
                                                        <th className="px-6 py-4">Duration</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {activities.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).map(activity => (
                                                        <tr key={activity.id} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{activity.title}</td>
                                                            <td className="px-6 py-4 text-gray-600">{activity.category}</td>
                                                            <td className="px-6 py-4 font-bold text-teal-900">{activity.price} MAD</td>
                                                            <td className="px-6 py-4 text-gray-500">{activity.duration}</td>
                                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(activity)}><Edit3 className="w-4 h-4 text-teal-600" /></Button>
                                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(activity.id, 'activities')}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </>
                                        )}

                                        {activeSection === 'packages' && (
                                            <>
                                                <thead className="bg-gray-50 border-y border-gray-100 italic text-xs uppercase text-gray-400 font-bold">
                                                    <tr>
                                                        <th className="px-6 py-4">Name</th>
                                                        <th className="px-6 py-4">Description</th>
                                                        <th className="px-6 py-4">Rating</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {packages.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(pkg => (
                                                        <tr key={pkg.id} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{pkg.name}</td>
                                                            <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{pkg.description}</td>
                                                            <td className="px-6 py-4 text-gray-500">{pkg.rating} ⭐</td>
                                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(pkg)}><Edit3 className="w-4 h-4 text-teal-600" /></Button>
                                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(pkg.id, 'packages')}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </>
                                        )}

                                        {activeSection === 'bookings' && (
                                            <>
                                                <thead className="bg-gray-50 border-y border-gray-100 italic text-xs uppercase text-gray-400 font-bold">
                                                    <tr>
                                                        <th className="px-6 py-4">Customer</th>
                                                        <th className="px-6 py-4">Item</th>
                                                        <th className="px-6 py-4">Date</th>
                                                        <th className="px-6 py-4">Amount</th>
                                                        <th className="px-6 py-4">Status</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {bookings.filter(b => b.customer.toLowerCase().includes(searchQuery.toLowerCase())).map(booking => (
                                                        <tr key={booking.id} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{booking.customer}</td>
                                                            <td className="px-6 py-4 text-gray-600">{booking.item}</td>
                                                            <td className="px-6 py-4 text-gray-500">{booking.date}</td>
                                                            <td className="px-6 py-4 font-bold text-teal-900">{booking.amount}</td>
                                                            <td className="px-6 py-4">
                                                                <Badge className={booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                                                                    {booking.status}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <Button variant="ghost" size="sm" onClick={() => handleDelete(booking.id, 'bookings')} className="text-red-500 hover:text-red-700">Cancel</Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </>
                                        )}
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}

function SidebarLink({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
                ? 'bg-teal-800 text-white shadow-lg'
                : 'text-teal-200 hover:bg-teal-800/50 hover:text-white'
                }`}
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </button>
    );
}
