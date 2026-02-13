import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ShoppingBasket, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/app/App';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface BasketPageProps {
    cart: CartItem[];
    removeFromCart: (id: string) => void;
    onProceed: () => void;
}

export function BasketPage({ cart, removeFromCart, onProceed }: BasketPageProps) {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const serviceCharge = cart.length > 0 ? 50 : 0;
    const total = subtotal + serviceCharge;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-md mx-auto">
                        <ShoppingBag className="w-16 h-16 text-teal-200 mx-auto mb-6" />
                        <h2 className="text-3xl text-teal-900 mb-4">Your basket is empty</h2>
                        <p className="text-teal-700 mb-8">Ready to start your adventure? Explore our hotels, cars, and activities.</p>
                        <Button
                            onClick={() => window.location.hash = '#hotels'}
                            className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                        >
                            Explore Now
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                            <ShoppingBasket className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-4xl text-teal-900">Your Basket</h1>
                            <p className="text-teal-700">Review your selections before checkout</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <Card key={item.id} className="border-teal-200 overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="w-full md:w-48 h-32">
                                                <ImageWithFallback
                                                    src={item.image || ''}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 p-6 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs uppercase tracking-wider text-teal-600 font-bold mb-1 block">
                                                            {item.type}
                                                        </span>
                                                        <h3 className="text-xl text-teal-900 font-semibold">{item.name}</h3>
                                                        <p className="text-sm text-teal-600">{item.details}</p>
                                                        {item.startDate && item.endDate && (
                                                            <div className="mt-2 text-sm text-teal-700 bg-teal-50 p-2 rounded">
                                                                <p><span className="font-semibold">Dates:</span> {item.startDate} to {item.endDate} ({item.totalDays} days)</p>
                                                                {item.pickupLocation && (
                                                                    <p><span className="font-semibold">Pickup:</span> {item.pickupLocation}</p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-xl font-bold text-teal-900">{item.price} MAD</p>
                                                </div>
                                                <div className="flex justify-end mt-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div>
                            <Card className="border-teal-200 sticky top-24">
                                <CardHeader className="bg-teal-50 border-b border-teal-100">
                                    <CardTitle className="text-lg text-teal-900">Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-teal-700">
                                            <span>Subtotal ({cart.length} items)</span>
                                            <span>{subtotal} MAD</span>
                                        </div>
                                        <div className="flex justify-between text-teal-700">
                                            <span>Service Charge</span>
                                            <span>{serviceCharge} MAD</span>
                                        </div>
                                        <div className="border-t border-teal-100 pt-4 mt-4">
                                            <div className="flex justify-between items-center mb-8">
                                                <span className="text-lg font-bold text-teal-900">Total</span>
                                                <span className="text-3xl font-bold text-teal-900">{total} MAD</span>
                                            </div>
                                            <Button
                                                onClick={onProceed}
                                                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-lg h-12 gap-2"
                                            >
                                                Proceed to Checkout
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>
                                            <p className="text-center text-xs text-teal-500 mt-4">
                                                Taxes and fees included
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
