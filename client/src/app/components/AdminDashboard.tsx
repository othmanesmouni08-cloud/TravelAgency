import { useState, useEffect } from 'react';
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
import { carApi, adminApi, bookingApi, activityApi } from '@/app/services/api';
import { Switch } from '@/app/components/ui/switch';

type AdminSection = 'overview' | 'hotels' | 'cars' | 'activities' | 'bookings' | 'packages' | 'services';

export function AdminDashboard() {
    const [activeSection, setActiveSection] = useState<AdminSection>('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<{ id: string; data: any } | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Load Cars on Mount
    const [cars, setCars] = useState<any[]>([]);

    // Load Activities on Mount
    const [activities, setActivities] = useState<any[]>([]);

    const [dashboardStats, setDashboardStats] = useState({
        totalRevenue: 0,
        newBookings: 0,
        activeListings: 0,
        happyCustomers: 0,
        alerts: [] as any[]
    });

    useEffect(() => {
        loadCars();
        loadActivities();
        loadStats();
    }, []);

    const loadActivities = async () => {
        try {
            const data = await activityApi.getAll();
            setActivities(Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []));
        } catch (error) {
            console.error("Failed to load activities", error);
        }
    };

    const loadStats = async () => {
        try {
            const response = await adminApi.getStats();
            if (response.success) {
                setDashboardStats(response.data);
            }
        } catch (error) {
            console.error("Failed to load admin stats", error);
            toast.error("Failed to load dashboard statistics");
        }
    };

    const loadCars = async () => {
        try {
            const data = await carApi.getAll();
            setCars(data);
        } catch (error) {
            console.error("Failed to load cars", error);
            // toast.error("Failed to load cars"); // If you want generic error toast
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleSectionChange = (section: AdminSection) => {
        setActiveSection(section);
        setIsSidebarOpen(false);
    };

    // Simulated Data for other sections
    const [hotels, setHotels] = useState([
        { id: 'h1', name: 'Riad Al-Oujda', location: 'Oujda Medina', price: 850, rating: 4.8, status: 'Active' },
        { id: 'h2', name: 'Figuig Oasis Resort', location: 'Figuig', price: 1200, rating: 4.9, status: 'Active' },
        { id: 'h3', name: 'Saïdia Beach Hotel', location: 'Saïdia', price: 1500, rating: 4.6, status: 'Inactive' },
        { id: 'h4', name: 'Berkane Garden Riad', location: 'Berkane', price: 750, rating: 4.5, status: 'Active' },
    ]);

    // Cars are now loaded from API
    // const [cars, setCars] = useState([...]);

    // Activities are now loaded from API
    // const [activities, setActivities] = useState([...]);

    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        if (activeSection === 'bookings') {
            loadBookings();
        }
    }, [activeSection]);

    const loadBookings = async () => {
        try {
            const data = await bookingApi.getAll();
            setBookings(data);
        } catch (error) {
            console.error("Failed to load bookings", error);
            // toast.error("Failed to load bookings");
        }
    };

    const [packages, setPackages] = useState([
        { id: 'p1', name: 'Oujda', description: 'The gateway to Eastern Morocco with beautiful architecture and vibrant culture', image: 'https://images.unsplash.com/photo-1716302235543-5517c070ad35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwb3VqZGElMjBjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 4.7, highlights: 'Historic Medina, French Architecture, Local Markets' },
        { id: 'p2', name: 'Saidia', description: 'Blue Pearl of the Mediterranean with 14km of pristine beaches', image: 'https://images.unsplash.com/photo-1707400015348-b0a5851ab163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwYmx1ZSUyMGNpdHklMjBjaGVmY2hhb3VlbnxlbnwxfHx8fDE3Njk3MDIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 4.9, highlights: 'Beach Resort, Water Sports, Marina' },
        { id: 'p3', name: 'Figuig', description: 'Ancient oasis with 200,000 palm trees and seven traditional ksour', image: 'https://images.unsplash.com/photo-1644028735064-4b124c4f7f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwZmlndWlnJTIwb2FzaXMlMjBwYWxtfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 4.8, highlights: 'Palm Oasis, Ancient Ksour, Desert Gateway' },
    ]);

    const [servicesData, setServicesData] = useState([
        { id: 's1', title: 'Luxury Car Rental', description: 'Explore Eastern Morocco with our premium fleet...', image: 'https://images.unsplash.com/...', features: 'SUVs & 4x4s, Luxury Sedans', page: 'cars' },
        { id: 's2', title: 'Authentic Hotels & Riads', description: 'Stay in Eastern Morocco\'s finest accommodations...', image: 'https://images.unsplash.com/...', features: 'Traditional Riads, Beach Resorts', page: 'hotels' },
    ]);

    const handleAvailabilityToggle = async (car: any) => {
        try {
            const updatedCar = { ...car, available: !car.available };
            await carApi.update(car.id, updatedCar);
            setCars(cars.map(c => c.id === car.id ? { ...c, available: !c.available } : c));
            toast.success(`Car marked as ${updatedCar.available ? 'Available' : 'Unavailable'}`);
        } catch (error) {
            console.error("Failed to update availability", error);
            toast.error("Failed to update availability");
        }
    };

    const handleActivityAvailabilityToggle = async (activity: any) => {
        try {
            const updatedActivity = { ...activity, available: !activity.available };
            await activityApi.update(activity.id, updatedActivity);
            setActivities(activities.map(a => a.id === activity.id ? { ...a, available: !a.available } : a));
            toast.success(`Activity marked as ${updatedActivity.available ? 'Available' : 'Unavailable'}`);
        } catch (error) {
            console.error("Failed to update activity availability", error);
            toast.error("Failed to update activity availability");
        }
    };

    const handleBookingStatus = async (id: string, status: string) => {
        try {
            await bookingApi.updateStatus(id, status);
            toast.success(`Booking ${status}`);
            loadBookings();
            loadStats(); // Reload stats to update revenue/counts
        } catch (error) {
            console.error("Failed to update booking status", error);
            toast.error("Failed to update booking status");
        }
    };

    const handleDelete = async (id: string, section: AdminSection) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                if (section === 'hotels') setHotels(hotels.filter(h => h.id !== id));
                if (section === 'cars') {
                    await carApi.delete(id);
                    loadCars();
                }
                if (section === 'activities') {
                    await activityApi.delete(id);
                    loadActivities();
                }
                if (section === 'bookings') {
                    // For now, let's say delete is cancel, or just remove from view if needed.
                    // But user asked for status update. Let's keep delete separate if exists.
                    // The backend delete isn't implemented for bookings yet, so maybe just UI delete?
                    // I will implement status update buttons instead of delete for bookings in the table.
                    setBookings(bookings.filter(b => b._id !== id));
                }
                if (section === 'packages') setPackages(packages.filter(p => p.id !== id));
                if (section === 'services') setServicesData(servicesData.filter(s => s.id !== id));
                toast.success('Item deleted successfully');
            } catch (error) {
                toast.error('Failed to delete item');
            }
        }
    };

    const handleFormSubmit = async (data: any) => {
        console.log("handleFormSubmit called with:", data);
        try {
            if (editingItem) {
                // Update
                if (activeSection === 'hotels') {
                    setHotels(hotels.map(h => h.id === editingItem.id ? { ...h, ...data } : h));
                }
                if (activeSection === 'cars') {
                    console.log("Updating car...", editingItem.id);
                    const carData = { ...data, pricePerDay: data.price };
                    await carApi.update(editingItem.id, carData);
                    console.log("Car updated via API");
                    loadCars();
                }
                if (activeSection === 'activities') {
                    await activityApi.update(editingItem.id, data);
                    loadActivities();
                }
                if (activeSection === 'packages') setPackages(packages.map(p => p.id === editingItem.id ? { ...p, ...data } : p));
                if (activeSection === 'services') setServicesData(servicesData.map(s => s.id === editingItem.id ? { ...s, ...data } : s));
                toast.success('Item updated successfully');
            } else {
                // Create
                const id = Math.random().toString(36).substr(2, 9);
                if (activeSection === 'hotels') setHotels([...hotels, { id, ...data }]);
                if (activeSection === 'cars') {
                    console.log("Creating new car...");
                    // Generate numeric ID for cars if needed by schema, or rely on backend. 
                    // Schema says id: Number required.
                    const newId = Math.floor(Math.random() * 1000000);
                    const carData = { ...data, id: newId, pricePerDay: data.price };
                    console.log("Payload:", carData);
                    const result = await carApi.create(carData);
                    console.log("Car created result:", result);
                    loadCars();
                }
                if (activeSection === 'activities') {
                    const newId = Math.floor(Math.random() * 1000000);
                    await activityApi.create({ ...data, id: newId });
                    loadActivities();
                }
                if (activeSection === 'packages') setPackages([...packages, { id, ...data }]);
                if (activeSection === 'services') setServicesData([...servicesData, { id, ...data }]);
                toast.success('Item added successfully');
            }
            setIsDialogOpen(false);
            setEditingItem(null);
        } catch (error: any) {
            console.error("Form submit error", error);
            toast.error(`Failed to save item: ${error.message || error}`);
        }
    };

    const handleEdit = (item: any) => {
        let data = item;
        if (activeSection === 'cars') {
            data = { ...item, price: item.pricePerDay || item.price };
        }
        setEditingItem({ id: item.id, data });
        setIsDialogOpen(true);
    };

    const stats = [
        { title: 'Total Revenue', value: `${dashboardStats.totalRevenue.toLocaleString()} MAD`, icon: CreditCard, change: '', color: 'border-teal-500' },
        { title: 'New Bookings', value: dashboardStats.newBookings.toString(), icon: LayoutDashboard, change: '', color: 'border-cyan-500' },
        { title: 'Active Listings', value: dashboardStats.activeListings.toString(), icon: Package, change: '', color: 'border-teal-600' },
        { title: 'Happy Customers', value: dashboardStats.happyCustomers.toString(), icon: Users, change: '', color: 'border-cyan-600' },
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
                                        {dashboardStats.alerts.length > 0 ? (
                                            dashboardStats.alerts.map((alert, index) => (
                                                <div key={index} className={`flex items-center gap-4 p-4 rounded-lg ${alert.type === 'inventory' ? 'bg-amber-50' : 'bg-teal-50'
                                                    }`}>
                                                    <div className={`w-2 h-2 rounded-full ${alert.type === 'inventory' ? 'bg-amber-500' : 'bg-teal-500'
                                                        }`} />
                                                    <p className={`text-sm font-medium ${alert.type === 'inventory' ? 'text-amber-900' : 'text-teal-900'
                                                        }`}>{alert.message}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">No important alerts</p>
                                        )}
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
                                                        <th className="px-6 py-4">Availability</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {cars.filter(c => ((c.brand || '') + ' ' + (c.model || '')).toLowerCase().includes(searchQuery.toLowerCase())).map(car => (
                                                        <tr key={car.id} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{car.brand} {car.model}</td>
                                                            <td className="px-6 py-4 text-gray-600">{car.type}</td>
                                                            <td className="px-6 py-4 font-bold text-teal-900">{car.price || car.pricePerDay} MAD</td>
                                                            <td className="px-6 py-4 text-gray-500">{car.seats}</td>
                                                            <td className="px-6 py-4 text-gray-500">{car.transmission}</td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <Switch
                                                                        checked={car.available !== false} // Default to true if undefined
                                                                        onCheckedChange={() => handleAvailabilityToggle(car)}
                                                                    />
                                                                    <span className="text-sm text-gray-500">{car.available !== false ? 'Available' : 'Unavailable'}</span>
                                                                </div>
                                                            </td>
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
                                                        <th className="px-6 py-4">Availability</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {activities.filter(a => (a.name || a.title || '').toLowerCase().includes(searchQuery.toLowerCase())).map(activity => (
                                                        <tr key={activity.id} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{activity.name || activity.title}</td>
                                                            <td className="px-6 py-4 text-gray-600">{activity.Category || activity.category}</td>
                                                            <td className="px-6 py-4 font-bold text-teal-900">{activity.price} MAD</td>
                                                            <td className="px-6 py-4 text-gray-500">{activity.duration}</td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <Switch
                                                                        checked={activity.available !== false}
                                                                        onCheckedChange={() => handleActivityAvailabilityToggle(activity)}
                                                                    />
                                                                    <span className="text-sm text-gray-500">{activity.available !== false ? 'Available' : 'Unavailable'}</span>
                                                                </div>
                                                            </td>
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
                                                    {bookings.filter(b => (b.customerName || '').toLowerCase().includes(searchQuery.toLowerCase())).map(booking => (
                                                        <tr key={booking._id} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{booking.customerName}</td>
                                                            <td className="px-6 py-4 text-gray-600">{booking.serviceType}</td>
                                                            <td className="px-6 py-4 text-gray-500">{new Date(booking.startDate).toLocaleDateString()}</td>
                                                            <td className="px-6 py-4 font-bold text-teal-900">{booking.totalPrice} MAD</td>
                                                            <td className="px-6 py-4">
                                                                <Badge className={
                                                                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                                        (booking.status === 'cancellation_requested' || booking.status === 'change_requested') ? 'bg-purple-100 text-purple-700' :
                                                                            booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                                                'bg-red-100 text-red-700'
                                                                }>
                                                                    {booking.status.replace('_', ' ')}
                                                                </Badge>
                                                                {booking.changeRequestDetails && (
                                                                    <div className="text-xs text-gray-500 mt-1 max-w-xs">{booking.changeRequestDetails}</div>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                                {(booking.status === 'pending' || booking.status === 'change_requested') && (
                                                                    <>
                                                                        <Button variant="ghost" size="sm" onClick={() => handleBookingStatus(booking._id, 'confirmed')} className="text-green-600 hover:text-green-800 hover:bg-green-50">
                                                                            Confirm
                                                                        </Button>
                                                                        <Button variant="ghost" size="sm" onClick={() => handleBookingStatus(booking._id, 'cancelled')} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                                            Cancel
                                                                        </Button>
                                                                    </>
                                                                )}
                                                                {(booking.status === 'confirmed' || booking.status === 'cancellation_requested') && (
                                                                    <Button variant="ghost" size="sm" onClick={() => handleBookingStatus(booking._id, 'cancelled')} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                                        Cancel
                                                                    </Button>
                                                                )}
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
