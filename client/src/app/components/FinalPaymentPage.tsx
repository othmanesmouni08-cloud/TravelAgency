import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { CreditCard, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

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

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
            toast.error('Please fill in all card details');
            return;
        }

        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            toast.success('Payment Successful! Your booking is confirmed.');
            onComplete();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl text-teal-900 mb-4">Complete Your Payment</h1>
                        <p className="text-lg text-teal-700">Secure checkout for your Eastern Morocco adventure</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Payment Form */}
                        <div className="md:col-span-2">
                            <Card className="border-teal-200">
                                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                                    <CardTitle className="flex items-center gap-2">
                                        <Lock className="w-5 h-5" />
                                        Secure Payment
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <form onSubmit={handlePay} className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="cardName">Name on Card</Label>
                                                <Input
                                                    id="cardName"
                                                    value={formData.cardName}
                                                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                                                    placeholder="JOHN DOE"
                                                    className="border-teal-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="cardNumber">Card Number</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                                        placeholder="**** **** **** ****"
                                                        className="border-teal-200 pr-10"
                                                        required
                                                    />
                                                    <CreditCard className="absolute right-3 top-2.5 w-5 h-5 text-teal-400" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="expiryDate">Expiry Date</Label>
                                                    <Input
                                                        id="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                                        placeholder="MM/YY"
                                                        className="border-teal-200"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="cvv">CVV</Label>
                                                    <Input
                                                        id="cvv"
                                                        type="password"
                                                        maxLength={3}
                                                        value={formData.cvv}
                                                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                                        placeholder="***"
                                                        className="border-teal-200"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg text-sm text-teal-700">
                                            <ShieldCheck className="w-8 h-8 text-teal-600 flex-shrink-0" />
                                            <p>Your payment information is encrypted and processed securely. We never store your full card details.</p>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isProcessing}
                                            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-lg h-12"
                                        >
                                            {isProcessing ? 'Processing...' : 'Pay Now & Confirm Booking'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div>
                            <Card className="border-teal-200 sticky top-24">
                                <CardHeader className="bg-teal-50">
                                    <CardTitle className="text-lg text-teal-900">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex justify-between items-start text-sm">
                                                <div className="text-teal-700">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-[10px] uppercase opacity-60">{item.type}</p>
                                                </div>
                                                <span className="text-teal-900 font-medium">{item.price} MAD</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-teal-100 pt-3">
                                            <div className="flex justify-between items-start text-sm">
                                                <span className="text-teal-700">Subtotal</span>
                                                <span className="text-teal-900">{subtotal} MAD</span>
                                            </div>
                                            <div className="flex justify-between items-start text-sm">
                                                <span className="text-teal-700">Service Charge</span>
                                                <span className="text-teal-900">{serviceCharge} MAD</span>
                                            </div>
                                        </div>
                                        <div className="border-t border-teal-100 pt-4">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="text-lg font-bold text-teal-900">Total</span>
                                                <span className="text-2xl font-bold text-teal-900">{total} MAD</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs text-teal-600 flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3" />
                                                Instant Confirmation
                                            </p>
                                            <p className="text-xs text-teal-600 flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3" />
                                                Secure Transaction
                                            </p>
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
