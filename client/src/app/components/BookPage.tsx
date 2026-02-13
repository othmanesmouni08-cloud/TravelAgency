import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Calendar, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
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
            Tell us about your dream trip and we'll create the perfect Eastern Morocco experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Booking Form */}
          <div className="lg:col-span-2">
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
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="border-teal-200"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="border-teal-200"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                        className="border-teal-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="space-y-4 pt-6 border-t border-teal-100">
                    <h3 className="text-lg text-teal-900">Trip Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="border-teal-200"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="border-teal-200"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="border-teal-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="destination">Preferred Destinations</Label>
                        <Input
                          id="destination"
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          placeholder="Oujda, Figuig, Saidia..."
                          className="border-teal-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-4 pt-6 border-t border-teal-100">
                    <h3 className="text-lg text-teal-900">Additional Information</h3>
                    <div>
                      <Label htmlFor="message">Special Requests or Questions</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your preferences, interests, dietary requirements, etc."
                        rows={5}
                        className="border-teal-200"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700"
                  >
                    Proceed to Final Payment
                  </Button>

                  <p className="text-xs text-teal-600 text-center">
                    * Required fields. We'll respond within 24 hours with a customized itinerary and quote.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* What's Included */}
            <Card className="border-teal-200">
              <CardHeader className="bg-teal-50">
                <CardTitle className="text-lg">What's Included</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {[
                    'Personalized itinerary',
                    'Accommodation booking',
                    'Car rental arrangement',
                    'Activity reservations',
                    'Local guide services',
                    '24/7 support during trip'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-teal-700">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Info */}
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
                      +212 123 456 789
                    </a>
                  </div>
                </div>
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
                      Oujda, Eastern Morocco<br />
                      L'Oriental Region
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="border-teal-200 bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg mb-4">Why Book With Us?</h4>
                <div className="space-y-2 text-sm text-cyan-50">
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
          <h2 className="text-3xl text-teal-900 text-center mb-12">Popular Package Ideas</h2>
          <div className="grid md:grid-cols-3 gap-6">
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
