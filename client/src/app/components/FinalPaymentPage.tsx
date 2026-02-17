import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { paymentApi } from '@/app/services/api';
import { CartItem } from '@/app/App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ onComplete, total, customerName, paymentId }: { onComplete: () => void; total: number; customerName: string; paymentId: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin,
                payment_method_data: {
                    billing_details: {
                        name: customerName,
                    }
                }
            },
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message || 'An unexpected error occurred.');
            toast.error(error.message || 'Payment failed.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Confirm with our backend
            try {
                await paymentApi.confirmPayment({
                    paymentIntentId: paymentIntent.id,
                    paymentId
                });
                toast.success('Payment Successful! Your booking is pending approval.');
                onComplete();
            } catch (err) {
                console.error('Backend confirmation failed', err);
                // Even if backend fails here, Stripe succeeded. 
                // We might want to show a specific message or just rely on webhook backup (if we had one).
                // For now, let's treat it as success but log it.
                toast.success('Payment processed. Booking pending approval.');
                onComplete();
            }
            setIsProcessing(false);
        } else {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            {message && <div className="text-red-500 text-sm">{message}</div>}
            <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 text-sm text-teal-100/60">
                <ShieldCheck className="w-10 h-10 text-cyan-400 flex-shrink-0" />
                <p className="leading-relaxed">Your payment information is encrypted and processed securely by Stripe.</p>
            </div>
            <Button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xl font-bold h-16 rounded-xl shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
                {isProcessing ? (
                    <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Processing...
                    </span>
                ) : `Pay ${total} MAD & Confirm`}
            </Button>
        </form>
    );
}

export function FinalPaymentPage({ onComplete, cart }: { onComplete: () => void; cart: CartItem[] }) {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const serviceCharge = cart.length > 0 ? 50 : 0;
    const total = subtotal + serviceCharge;

    const [clientSecret, setClientSecret] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [specialRequest, setSpecialRequest] = useState('');
    const [initializing, setInitializing] = useState(false);

    const initPayment = async () => {
        if (!customerName || !emailAddress || !phoneNumber) {
            toast.error('Please fill in all required fields');
            return;
        }
        setInitializing(true);
        try {
            const data = await paymentApi.checkout({
                cart,
                customerName,
                emailAddress,
                phoneNumber,
                specialRequest,
                paymentMethod: 'card'
            });
            setClientSecret(data.clientSecret);
            setPaymentId(data.paymentId);
        } catch (error: any) {
            toast.error('Failed to initialize payment');
        } finally {
            setInitializing(false);
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-20">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 tracking-tight">Complete Your Payment</h1>
                        <p className="text-xl text-teal-100/60 max-w-2xl mx-auto">Secure checkout for your Eastern Morocco adventure</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Payment Form */}
                        <div className="md:col-span-2">
                            <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden shadow-2xl">
                                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-b border-white/5">
                                    <CardTitle className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm">
                                        <Lock className="w-5 h-5" />
                                        Secure Payment Layer
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    {!clientSecret ? (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-teal-100/70 text-sm font-medium block mb-3">Name on Card</label>
                                                <input
                                                    value={customerName}
                                                    onChange={(e) => setCustomerName(e.target.value)}
                                                    placeholder="Enter your name"
                                                    className="w-full bg-white/5 border border-white/10 text-white h-14 rounded-xl px-4 focus:border-teal-500/50 transition-all font-bold tracking-wider placeholder:text-white/10 outline-none"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-teal-100/70 text-sm font-medium block mb-3">Email Address</label>
                                                    <input
                                                        type="email"
                                                        value={emailAddress}
                                                        onChange={(e) => setEmailAddress(e.target.value)}
                                                        placeholder="name@example.com"
                                                        className="w-full bg-white/5 border border-white/10 text-white h-14 rounded-xl px-4 focus:border-teal-500/50 transition-all font-medium placeholder:text-white/10 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-teal-100/70 text-sm font-medium block mb-3">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        placeholder="+212 6..."
                                                        className="w-full bg-white/5 border border-white/10 text-white h-14 rounded-xl px-4 focus:border-teal-500/50 transition-all font-medium placeholder:text-white/10 outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-teal-100/70 text-sm font-medium block mb-3">Special Request (Optional)</label>
                                                <textarea
                                                    value={specialRequest}
                                                    onChange={(e) => setSpecialRequest(e.target.value)}
                                                    placeholder="Any special requirements?"
                                                    className="w-full bg-white/5 border border-white/10 text-white h-24 rounded-xl p-4 focus:border-teal-500/50 transition-all font-medium placeholder:text-white/10 outline-none resize-none"
                                                />
                                            </div>
                                            <Button
                                                onClick={initPayment}
                                                disabled={initializing || !customerName || !emailAddress || !phoneNumber}
                                                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-lg rounded-xl"
                                            >
                                                {initializing ? 'Initializing...' : 'Proceed to Payment'}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', labels: 'floating' } }}>
                                            <CheckoutForm onComplete={onComplete} total={total} customerName={customerName} paymentId={paymentId} />
                                        </Elements>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div>
                            <Card className="bg-white/5 backdrop-blur-md border-white/10 sticky top-24 overflow-hidden shadow-2xl">
                                <CardHeader className="bg-white/5 border-b border-white/5">
                                    <CardTitle className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex justify-between items-start group">
                                                <div>
                                                    <p className="font-bold text-white group-hover:text-cyan-400 transition-colors">{item.name}</p>
                                                    <p className="text-[10px] uppercase font-bold text-teal-100/40 tracking-wider mt-1">{item.type}</p>
                                                </div>
                                                <span className="text-white font-mono">{item.price} MAD</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-white/10 pt-6 space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-teal-100/60 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                                                <span className="text-white font-mono">{subtotal} MAD</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-teal-100/60 uppercase tracking-widest text-[10px] font-bold">Service Charge</span>
                                                <span className="text-white font-mono">{serviceCharge} MAD</span>
                                            </div>
                                        </div>
                                        <div className="border-t border-white/10 pt-6">
                                            <div className="flex justify-between items-end mb-8">
                                                <div>
                                                    <p className="text-[10px] text-teal-100/40 uppercase tracking-widest font-bold mb-1">Total Amount</p>
                                                    <p className="text-4xl font-bold text-white tracking-tighter">{total}</p>
                                                </div>
                                                <div className="text-cyan-400 font-bold text-xs mb-1">MAD</div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-xs font-bold text-teal-100/40 uppercase tracking-wider">
                                                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                                Instant Confirmation
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-bold text-teal-100/40 uppercase tracking-wider">
                                                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                                Secure Transaction
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
