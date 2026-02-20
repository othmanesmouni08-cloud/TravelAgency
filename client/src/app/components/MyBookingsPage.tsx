import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, CreditCard, Activity, Hotel, Car, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { bookingApi } from '@/app/services/api';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import { Page } from '@/app/App';

interface MyBookingsPageProps {
    setCurrentPage?: (page: Page) => void;
}

interface Booking {
    _id: string;
    serviceId: any;
    serviceType: string;
    customerName: string;
    emailAddress: string;
    phoneNumber: string;
    specialRequest: string;
    status: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    changeRequestDetails?: string;
    createdAt: string;
}

export function MyBookingsPage({ setCurrentPage }: MyBookingsPageProps) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
    const [selectedBookingForChange, setSelectedBookingForChange] = useState<string | null>(null);
    const [changeRequestText, setChangeRequestText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const data = await bookingApi.getMyBookings();
            setBookings(data || []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch bookings');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'completed': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'cancellation_requested': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'change_requested': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            case 'pending': default: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            case 'cancellation_requested': return <AlertCircle className="w-4 h-4" />;
            case 'change_requested': return <AlertCircle className="w-4 h-4" />;
            case 'pending': default: return <Clock className="w-4 h-4" />;
        }
    };

    const getServiceTypeIcon = (type: string) => {
        switch (type) {
            case 'car': return <Car className="w-5 h-5" />;
            case 'hotel': return <Hotel className="w-5 h-5" />;
            case 'activity': return <Activity className="w-5 h-5" />;
            default: return <Calendar className="w-5 h-5" />;
        }
    };

    const handleRequestCancel = async (bookingId: string) => {
        if (!window.confirm("Are you sure you want to request a cancellation for this booking?")) return;
        try {
            await bookingApi.requestCancellation(bookingId);
            toast.success("Cancellation request submitted successfully");
            fetchBookings();
        } catch (error: any) {
            toast.error(error.message || "Failed to submit cancellation request");
        }
    };

    const openChangeModal = (bookingId: string) => {
        setSelectedBookingForChange(bookingId);
        setChangeRequestText('');
        setIsChangeModalOpen(true);
    };

    const handleSubmitChange = async () => {
        if (!selectedBookingForChange || !changeRequestText.trim()) {
            toast.error("Please provide change details");
            return;
        }

        setIsSubmitting(true);
        try {
            await bookingApi.requestChange(selectedBookingForChange, changeRequestText);
            toast.success("Change request submitted successfully");
            setIsChangeModalOpen(false);
            fetchBookings();
        } catch (error: any) {
            toast.error(error.message || "Failed to submit change request");
        } finally {
            setIsSubmitting(false);
        }
    };

    const canModify = (status: string) => {
        return status === 'pending' || status === 'confirmed';
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-white mb-2">My Bookings</h1>
                    <p className="text-teal-100/70">View and manage all your travel bookings in one place.</p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
                    >
                        <Calendar className="w-16 h-16 text-teal-500/50 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white mb-2">No Bookings Found</h3>
                        <p className="text-teal-100/70 mb-6">Looks like you haven't booked anything yet.</p>
                        {setCurrentPage && (
                            <Button
                                onClick={() => setCurrentPage('home')}
                                className="bg-gradient-to-r from-teal-500 to-cyan-600 font-bold"
                            >
                                Explore Destinations
                            </Button>
                        )}
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking, index) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden relative group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    {/* Left Side: Service Details */}
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className={`p-4 rounded-xl border flex-shrink-0 ${booking.serviceType === 'hotel' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                                                booking.serviceType === 'car' ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' :
                                                    'bg-purple-500/10 border-purple-500/20 text-purple-400'
                                            }`}>
                                            {getServiceTypeIcon(booking.serviceType)}
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-white capitalize mb-1">
                                                {booking.serviceType} Booking
                                            </h3>
                                            <div className="text-sm text-teal-100/70 mb-3 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border mb-4 ${getStatusColor(booking.status)}">
                                                {getStatusIcon(booking.status)}
                                                {booking.status.replace('_', ' ')}
                                            </div>

                                            {booking.changeRequestDetails && (
                                                <div className="mt-2 text-sm bg-white/5 border border-white/10 p-3 rounded-lg text-teal-100/80">
                                                    <strong className="text-white block mb-1">Change Request:</strong>
                                                    {booking.changeRequestDetails}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Side: Price & Actions */}
                                    <div className="flex flex-col items-start md:items-end justify-between h-full min-w-[200px] border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                                        <div className="text-left md:text-right mb-4 w-full">
                                            <span className="text-sm text-teal-100/50 block mb-1">Total Amount</span>
                                            <div className="text-2xl font-bold text-white flex items-center md:justify-end gap-1">
                                                <span className="text-teal-400text-lg">$</span>
                                                {booking.totalPrice?.toFixed(2) || '0.00'}
                                            </div>
                                        </div>

                                        {canModify(booking.status) && (
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <Button
                                                    onClick={() => openChangeModal(booking._id)}
                                                    variant="outline"
                                                    className="flex-1 md:flex-none border-white/10 hover:bg-white/5 text-teal-100 text-xs py-1 h-8"
                                                >
                                                    Request Change
                                                </Button>
                                                <Button
                                                    onClick={() => handleRequestCancel(booking._id)}
                                                    variant="outline"
                                                    className="flex-1 md:flex-none border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs py-1 h-8"
                                                >
                                                    Request Cancel
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Change Request Modal */}
            {isChangeModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
                    >
                        <button
                            onClick={() => setIsChangeModalOpen(false)}
                            className="absolute top-4 right-4 text-white/50 hover:text-white"
                        >
                            <XCircle className="w-6 h-6" />
                        </button>
                        <h3 className="text-xl font-bold text-white mb-2">Request Booking Change</h3>
                        <p className="text-sm text-teal-100/70 mb-4">
                            Please describe the changes you would like to make (e.g., different dates, different destination). Our team will review and contact you.
                        </p>
                        <textarea
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows={4}
                            placeholder="I would like to change..."
                            value={changeRequestText}
                            onChange={(e) => setChangeRequestText(e.target.value)}
                        />
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setIsChangeModalOpen(false)}
                                className="border-white/10 text-white hover:bg-white/5"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmitChange}
                                disabled={isSubmitting || !changeRequestText.trim()}
                                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
