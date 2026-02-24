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
    const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const serviceCharge = cart.length > 0 ? 50 : 0;
    const total = subtotal + serviceCharge;
    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#030213] py-12 my-28 relative overflow-hidden pt-32 pb-20">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-md mx-auto">
                        <ShoppingBag className="w-16 h-16 text-teal-200 mx-auto mb-6" />
                        <h2 className="text-3xl text-white mb-4 font-bold">Your basket is empty</h2>
                        <p className="text-teal-100/60 mb-8 leading-relaxed">Ready to start your adventure? Explore our hotels, cars, and activities in the beautiful Eastern region.</p>
                        <Button
                            onClick={() => window.location.hash = '#hotels'}
                            className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-teal-500/20 hover:scale-105 transition-all"
                        >
                            Explore Now
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-20">

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 pt-20">

                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-14 h-14 bg-gradient-to-br from-teal-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center text-cyan-400 border border-teal-500/30">
                            <ShoppingBasket className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-4xl text-white font-bold">Your Basket</h1>
                            <p className="text-teal-100/60">Review your selections before checkout</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <Card key={item.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-teal-500/30 transition-all duration-300 overflow-hidden group">
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
                                                        <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-1 block">
                                                            {item.type}
                                                        </span>
                                                        <h3 className="text-xl text-white font-bold tracking-tight">{item.name}</h3>
                                                        <p className="text-sm text-teal-100/60">{item.details}</p>
                                                        {item.startDate && (
                                                            <div className="flex items-center gap-2 mt-1 text-sm text-teal-100/80">
                                                                <span className="text-cyan-400">Date:</span>
                                                                {item.startDate}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-xl font-bold text-white">{item.price} MAD</p>
                                                </div>
                                                <div className="flex justify-end mt-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-2 transition-colors"
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
                            <Card className="bg-white/5 backdrop-blur-sm border-white/10 sticky top-24">
                                <CardHeader className="bg-white/5 border-b border-white/5">
                                    <CardTitle className="text-lg text-white font-bold">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-teal-100/80">
                                            <span>Subtotal ({cart.length} items)</span>
                                            <span className="text-white font-medium">{subtotal} MAD</span>
                                        </div>
                                        <div className="flex justify-between text-teal-100/80">
                                            <span>Service Charge</span>
                                            <span className="text-white font-medium">{serviceCharge} MAD</span>
                                        </div>
                                        <div className="border-t border-white/10 pt-4 mt-4">
                                            <div className="flex justify-between items-center mb-8">
                                                <span className="text-lg font-bold text-white">Total</span>
                                                <span className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
                                                    {total} MAD
                                                </span>
                                            </div>
                                            <Button
                                                onClick={onProceed}
                                                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-lg h-14 rounded-xl shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
                                            >
                                                Proceed to Checkout
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>
                                            <p className="text-center text-xs text-teal-100/40 mt-4">
                                                All taxes and regional fees included
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
