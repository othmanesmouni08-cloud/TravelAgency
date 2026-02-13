import { useState } from 'react';
import { User as UserType } from '@/app/App';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface AuthPageProps {
    initialMode?: 'login' | 'signup';
    onBackToHome: () => void;
    onLogin: (user: UserType) => void;
}

export function AuthPage({ initialMode = 'login', onBackToHome, onLogin }: AuthPageProps) {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);

            // Mock authentication logic
            if (email === 'admin@loriental.com' && password === 'admin123') {
                onLogin({
                    email,
                    role: 'admin',
                    name: 'Admin User'
                });
            } else {
                onLogin({
                    email,
                    role: 'user',
                    name: email.split('@')[0]
                });
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-teal-100">
                {/* Visual Side */}
                <div className="hidden md:block relative overflow-hidden group">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx0cmF2ZWwlMjBtb3JvY2NvfGVufDF8fHx8MTc2OTcwMjI5NXww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Morocco Travel"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent flex flex-col justify-end p-12 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-bold mb-4">Start Your Journey with L'Oriental</h2>
                            <p className="text-teal-50 text-lg mb-6 leading-relaxed">
                                Join our community of travelers and explore the hidden gems of Eastern Morocco with personalized itineraries and exclusive deals.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-teal-100">
                                            <ImageWithFallback src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                        </div>
                                    ))}
                                </div>
                                <p className="flex items-center text-sm font-medium">
                                    Joined by 2,000+ travelers
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-10">
                        <button onClick={onBackToHome} className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                <span className="text-xl">✦</span>
                            </div>
                            <span className="font-bold text-teal-900 text-xl">L'Oriental</span>
                        </button>
                        <div className="text-sm font-medium text-teal-600 uppercase tracking-wider">
                            {mode === 'login' ? 'Welcome Back' : 'Get Started'}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-3xl font-bold text-teal-950 mb-2">
                                {mode === 'login' ? 'Login to your account' : 'Create an account'}
                            </h3>
                            <p className="text-teal-600 mb-10">
                                {mode === 'login'
                                    ? 'Enter your credentials to access your travel dashboard.'
                                    : 'Start planning your dream trip to Eastern Morocco today.'}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {mode === 'signup' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                                            <Input id="name" placeholder="John Doe" className="pl-10 h-12 rounded-xl border-teal-100 focus:border-teal-500" required />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            className="pl-10 h-12 rounded-xl border-teal-100 focus:border-teal-500"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password">Password</Label>
                                        {mode === 'login' && (
                                            <button type="button" className="text-xs font-semibold text-teal-600 hover:text-teal-800 transition">
                                                Forgot password?
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10 h-12 rounded-xl border-teal-100 focus:border-teal-500"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-lg font-bold shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-8 relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-teal-100"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-4 text-teal-400 font-medium">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-12 rounded-xl border-teal-100 hover:bg-teal-50 group">
                                    <Chrome className="w-5 h-5 mr-2 text-red-500 group-hover:scale-110 transition-transform" />
                                    Google
                                </Button>
                                <Button variant="outline" className="h-12 rounded-xl border-teal-100 hover:bg-teal-50 group">
                                    <Github className="w-5 h-5 mr-2 text-black group-hover:scale-110 transition-transform" />
                                    GitHub
                                </Button>
                            </div>

                            <p className="mt-10 text-center text-sm text-teal-600">
                                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                                <button
                                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                    className="ml-2 font-bold text-teal-900 underline underline-offset-4 hover:text-cyan-600 transition"
                                >
                                    {mode === 'login' ? 'Sign up for free' : 'Log in here'}
                                </button>
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
