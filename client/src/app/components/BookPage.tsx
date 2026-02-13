import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
<<<<<<< HEAD
import { Calendar, Phone, Mail, MapPin, CheckCircle2, Sparkles, Users } from 'lucide-react';
=======
import { Calendar, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
>>>>>>> Taoufiq
import { toast } from 'sonner';

export function BookPage({ onProceedToPayment }: { onProceedToPayment: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    startDate: '',
    endDate: '',
    destination: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    // Proceed to payment page instead of subbmitting here
    onProceedToPayment();
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-wider">Book Your Trip</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-white font-bold tracking-tight">Customize Your Journey</h1>
          <p className="text-xl text-teal-100/60 max-w-2xl mx-auto">
=======
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-teal-600" />
            <span className="text-teal-600 uppercase tracking-wider">Book Your Trip</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-teal-900">Customize Your Journey</h1>
          <p className="text-xl text-teal-700 max-w-2xl mx-auto">
>>>>>>> Taoufiq
            Tell us about your dream trip and we'll create the perfect Eastern Morocco experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Booking Form */}
          <div className="lg:col-span-2">
<<<<<<< HEAD
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl text-white font-semibold flex items-center gap-2">
                      <Users className="w-5 h-5 text-cyan-400" />
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-teal-100/70">Full Name *</Label>
=======
            <Card className="border-teal-200">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg text-teal-900">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
>>>>>>> Taoufiq
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
<<<<<<< HEAD
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 focus:border-teal-500/50 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-teal-100/70">Email *</Label>
=======
                          className="border-teal-200"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
>>>>>>> Taoufiq
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
<<<<<<< HEAD
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 focus:border-teal-500/50 transition-all"
=======
                          className="border-teal-200"
>>>>>>> Taoufiq
                          required
                        />
                      </div>
                    </div>
<<<<<<< HEAD
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-teal-100/70">Phone Number *</Label>
=======
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
>>>>>>> Taoufiq
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
<<<<<<< HEAD
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 focus:border-teal-500/50 transition-all"
=======
                        className="border-teal-200"
>>>>>>> Taoufiq
                        required
                      />
                    </div>
                  </div>

                  {/* Trip Details */}
<<<<<<< HEAD
                  <div className="space-y-6 pt-8 border-t border-white/5">
                    <h3 className="text-xl text-white font-semibold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      Trip Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="startDate" className="text-teal-100/70">Start Date *</Label>
=======
                  <div className="space-y-4 pt-6 border-t border-teal-100">
                    <h3 className="text-lg text-teal-900">Trip Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date *</Label>
>>>>>>> Taoufiq
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
<<<<<<< HEAD
                          className="bg-white/5 border-white/10 text-white h-12 focus:border-teal-500/50 transition-all [color-scheme:dark]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate" className="text-teal-100/70">End Date</Label>
=======
                          className="border-teal-200"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
>>>>>>> Taoufiq
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
<<<<<<< HEAD
                          className="bg-white/5 border-white/10 text-white h-12 focus:border-teal-500/50 transition-all [color-scheme:dark]"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="guests" className="text-teal-100/70">Number of Guests</Label>
=======
                          className="border-teal-200"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
>>>>>>> Taoufiq
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
<<<<<<< HEAD
                          className="bg-white/5 border-white/10 text-white h-12 focus:border-teal-500/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination" className="text-teal-100/70">Preferred Destinations</Label>
=======
                          className="border-teal-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="destination">Preferred Destinations</Label>
>>>>>>> Taoufiq
                        <Input
                          id="destination"
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          placeholder="Oujda, Figuig, Saidia..."
<<<<<<< HEAD
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 focus:border-teal-500/50 transition-all"
=======
                          className="border-teal-200"
>>>>>>> Taoufiq
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
<<<<<<< HEAD
                  <div className="space-y-6 pt-8 border-t border-white/5">
                    <h3 className="text-xl text-white font-semibold">Additional Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-teal-100/70">Special Requests or Questions</Label>
=======
                  <div className="space-y-4 pt-6 border-t border-teal-100">
                    <h3 className="text-lg text-teal-900">Additional Information</h3>
                    <div>
                      <Label htmlFor="message">Special Requests or Questions</Label>
>>>>>>> Taoufiq
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your preferences, interests, dietary requirements, etc."
                        rows={5}
<<<<<<< HEAD
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50 transition-all resize-none"
=======
                        className="border-teal-200"
>>>>>>> Taoufiq
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
<<<<<<< HEAD
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 h-14 text-lg font-bold rounded-xl shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all"
=======
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700"
>>>>>>> Taoufiq
                  >
                    Proceed to Final Payment
                  </Button>

<<<<<<< HEAD
                  <p className="text-xs text-teal-100/40 text-center">
=======
                  <p className="text-xs text-teal-600 text-center">
>>>>>>> Taoufiq
                    * Required fields. We'll respond within 24 hours with a customized itinerary and quote.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* What's Included */}
<<<<<<< HEAD
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg text-white font-bold">What's Included</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
=======
            <Card className="border-teal-200">
              <CardHeader className="bg-teal-50">
                <CardTitle className="text-lg">What's Included</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
>>>>>>> Taoufiq
                  {[
                    'Personalized itinerary',
                    'Accommodation booking',
                    'Car rental arrangement',
                    'Activity reservations',
                    'Local guide services',
                    '24/7 support during trip'
                  ].map((item, idx) => (
<<<<<<< HEAD
                    <li key={idx} className="flex items-start gap-3 text-sm text-teal-100/60">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
=======
                    <li key={idx} className="flex items-start gap-2 text-sm text-teal-700">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
>>>>>>> Taoufiq
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Info */}
<<<<<<< HEAD
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg text-white font-bold">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-semibold">Call Us</p>
                    <a href="tel:+212123456789" className="text-sm text-teal-100/60 hover:text-cyan-400 transition-colors">
=======
            <Card className="border-teal-200">
              <CardHeader className="bg-teal-50">
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-teal-900">Call Us</p>
                    <a href="tel:+212123456789" className="text-sm text-teal-700 hover:text-teal-600">
>>>>>>> Taoufiq
                      +212 123 456 789
                    </a>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-semibold">Email Us</p>
                    <a href="mailto:info@loriental.com" className="text-sm text-teal-100/60 hover:text-cyan-400 transition-colors">
                      info@loriental.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-semibold">Visit Us</p>
                    <p className="text-sm text-teal-100/60">
=======
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-teal-900">Email Us</p>
                    <a href="mailto:info@moroccotravel.com" className="text-sm text-teal-700 hover:text-teal-600">
                      info@moroccotravel.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-teal-900">Visit Us</p>
                    <p className="text-sm text-teal-700">
>>>>>>> Taoufiq
                      Oujda, Eastern Morocco<br />
                      L'Oriental Region
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
<<<<<<< HEAD
            <Card className="border-none bg-gradient-to-br from-teal-500/20 to-cyan-600/20 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <CardContent className="p-6 text-center relative z-10">
                <h4 className="text-lg text-white font-bold mb-4">Why Book With Us?</h4>
                <div className="space-y-2 text-sm text-teal-100/70">
=======
            <Card className="border-teal-200 bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg mb-4">Why Book With Us?</h4>
                <div className="space-y-2 text-sm text-cyan-50">
>>>>>>> Taoufiq
                  <p>✓ Licensed by Moroccan Tourism Board</p>
                  <p>✓ 10+ Years of Experience</p>
                  <p>✓ 500+ Happy Travelers</p>
                  <p>✓ Best Price Guarantee</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Popular Packages */}
        <div className="mt-20 max-w-5xl mx-auto">
<<<<<<< HEAD
          <h2 className="text-3xl text-white font-bold text-center mb-12">Popular Package Ideas</h2>
          <div className="grid md:grid-cols-3 gap-8">
=======
          <h2 className="text-3xl text-teal-900 text-center mb-12">Popular Package Ideas</h2>
          <div className="grid md:grid-cols-3 gap-6">
>>>>>>> Taoufiq
            {[
              {
                name: 'Coastal Explorer',
                days: '5 Days',
                price: '800 MAD',
                highlights: ['Saidia Beach', 'Nador', 'Mediterranean Coast']
              },
              {
                name: 'Desert & Oasis',
                days: '7 Days',
                price: '1,200 MAD',
                highlights: ['Figuig Oasis', 'Desert Camp', 'Stargazing']
              },
              {
                name: 'Cultural Journey',
                days: '4 Days',
                price: '650 MAD',
                highlights: ['Oujda Heritage', 'Local Markets', 'Cooking Class']
              }
            ].map((pkg, idx) => (
<<<<<<< HEAD
              <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-teal-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl text-white font-bold mb-3">{pkg.name}</h3>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <span className="text-teal-100/60 font-medium">{pkg.days}</span>
                    <span className="text-2xl text-white font-bold">{pkg.price}</span>
                  </div>
                  <ul className="space-y-3 text-sm text-teal-100/60">
                    {pkg.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                        {highlight}
                      </li>
=======
              <Card key={idx} className="border-teal-200 hover:shadow-lg transition">
                <CardContent className="p-6">
                  <h3 className="text-xl text-teal-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-teal-700">{pkg.days}</span>
                    <span className="text-2xl text-teal-900">{pkg.price}</span>
                  </div>
                  <ul className="space-y-1 text-sm text-teal-700">
                    {pkg.highlights.map((highlight, i) => (
                      <li key={i}>• {highlight}</li>
>>>>>>> Taoufiq
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
