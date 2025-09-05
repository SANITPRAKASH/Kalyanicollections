import Image from 'next/image'
import { MapPin, Clock, Phone, Mail, Award, Users, Heart, Star } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-4">
              About Pushkara Expressions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted boutique for authentic Indian wear, where tradition meets contemporary style
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-accent-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Pushkara Expressions was born from a passion for preserving and celebrating the rich 
                  heritage of Indian fashion. Founded in 2015, our boutique has been dedicated to 
                  bringing you the finest collection of traditional and contemporary Indian wear.
                </p>
                <p>
                  We believe that every piece of clothing tells a story, and we're committed to 
                  curating collections that not only look beautiful but also carry the essence of 
                  Indian craftsmanship and culture.
                </p>
                <p>
                  From elegant sarees to stunning lehengas, from comfortable kurtas to beautiful 
                  dupattas, we offer a wide range of authentic Indian wear for every occasion and 
                  every style preference.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-store.jpg"
                  alt="Pushkara Expressions Store"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-accent-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              What drives us to provide you with the best Indian wear experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-2">Authenticity</h3>
              <p className="text-gray-600">
                Every piece in our collection is carefully selected for its authentic craftsmanship and quality.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We maintain the highest standards of quality in all our products and services.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-2">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're here to help you find the perfect outfit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from product selection to customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/owner.jpg"
                  alt="Pushkara Expressions Owner"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-accent-900 mb-6">Meet Our Founder</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  "My journey with Indian fashion began over two decades ago when I first discovered 
                  the beauty and intricacy of traditional Indian textiles. What started as a personal 
                  passion has now become a mission to share this rich heritage with others."
                </p>
                <p>
                  "At Pushkara Expressions, we don't just sell clothes – we help you create memories. 
                  Whether it's your wedding day, a festival celebration, or a special occasion, 
                  we want you to feel confident and beautiful in our carefully curated pieces."
                </p>
                <p className="font-semibold text-accent-900">
                  - Priya Sharma, Founder & Creative Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Info Section */}
      <section className="py-16 bg-gradient-to-br from-accent-800 to-accent-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Store</h2>
            <p className="text-xl opacity-90">
              Experience our collection in person at our beautiful boutique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="opacity-90">
                123 Fashion Street<br />
                Mumbai, Maharashtra 400001<br />
                India
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Store Hours</h3>
              <p className="opacity-90">
                Monday - Saturday: 10:00 AM - 8:00 PM<br />
                Sunday: 11:00 AM - 6:00 PM<br />
                Closed on Public Holidays
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p className="opacity-90">
                Phone: +91 98765 43210<br />
                Email: info@pushkaraexpressions.com<br />
                WhatsApp: +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-accent-900 mb-4">
            Ready to Discover Your Perfect Look?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Visit our store or browse our online collection. Our team is here to help you 
            find the perfect piece for your special occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="btn-primary inline-flex items-center justify-center"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="btn-outline inline-flex items-center justify-center"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
