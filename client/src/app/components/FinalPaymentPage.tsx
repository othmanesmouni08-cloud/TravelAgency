import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { CreditCard, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { paymentApi } from '@/app/services/api';

import { CartItem } from '@/app/App';

export function FinalPaymentPage({ onComplete, cart }: { onComplete: () => void; cart: CartItem[] }) {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const serviceCharge = cart.length > 0 ? 50 : 0;
    const total = subtotal + serviceCharge;

    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
            toast.error('Please fill in all card details');
            return;
        }

        setIsProcessing(true);

        try {
            await paymentApi.checkout({
                cart,
                amount: total,
                customerName: formData.cardName,
                paymentMethod: 'credit_card'
            });

            toast.success('Payment Successful! Your booking is confirmed and saved.');
            onComplete();
        } catch (error: any) {
            console.error('Payment Error:', error);
            toast.error(error.message || 'Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
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
                                    <form onSubmit={handlePay} className="space-y-6">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label htmlFor="cardName" className="text-teal-100/70 text-sm font-medium">Name on Card</Label>
                                                <Input
                                                    id="cardName"
                                                    value={formData.cardName}
                                                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                                                    placeholder="JOHN DOE"
                                                    className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-teal-500/50 transition-all font-bold tracking-wider placeholder:text-white/10"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="cardNumber" className="text-teal-100/70 text-sm font-medium">Card Number</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                                        placeholder="**** **** **** ****"
                                                        className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-teal-500/50 transition-all font-mono text-lg pl-12 placeholder:text-white/10"
                                                        required
                                                    />
                                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <Label htmlFor="expiryDate" className="text-teal-100/70 text-sm font-medium">Expiry Date</Label>
                                                    <Input
                                                        id="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                                        placeholder="MM/YY"
                                                        className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-teal-500/50 transition-all font-mono text-lg text-center placeholder:text-white/10"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <Label htmlFor="cvv" className="text-teal-100/70 text-sm font-medium">CVV</Label>
                                                    <Input
                                                        id="cvv"
                                                        type="password"
                                                        maxLength={3}
                                                        value={formData.cvv}
                                                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                                        placeholder="***"
                                                        className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-teal-500/50 transition-all font-mono text-lg text-center placeholder:text-white/10"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 text-sm text-teal-100/60">
                                            <ShieldCheck className="w-10 h-10 text-cyan-400 flex-shrink-0" />
                                            <p className="leading-relaxed">Your payment information is encrypted and processed securely. We never store your full card details.</p>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isProcessing}
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
