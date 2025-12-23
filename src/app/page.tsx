import Link from 'next/link'
import { ArrowRight, Sparkles, Heart, Star, Users, Award } from 'lucide-react'
import Image from 'next/image'

const categories = [
  {
    name: 'Sarees',
    slug: 'sarees',
    image: '/images/categories/sarees.jpg',
    description: 'Elegant traditional sarees for every occasion',
    subcategories: ['Silk', 'Cotton', 'Party Wear']
  },
  {
    name: 'Lehengas',
    slug: 'lehengas',
    image: '/images/categories/lehengas.jpg',
    description: 'Stunning lehengas for special celebrations',
    subcategories: ['Bridal', 'Party']
  },
  {
    name: 'Kurtas & Sets',
    slug: 'kurtas-sets',
    image: '/images/categories/kurtas.jpg',
    description: 'Comfortable and stylish kurtas and sets',
    subcategories: ['Kurtis', 'Anarkalis']
  },
  {
    name: 'Dupattas & Shawls',
    slug: 'dupattas-shawls',
    image: '/images/categories/dupattas.jpg',
    description: 'Beautiful dupattas and shawls to complete your look',
    subcategories: []
  },
]

const features = [
  {
    icon: Heart,
    title: 'Authentic Collection',
    description: 'Curated selection of genuine Indian wear from trusted artisans'
  },
  {
    icon: Users,
    title: 'Expert Styling',
    description: 'Personal styling advice to help you find the perfect outfit'
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Every piece is carefully inspected for quality and authenticity'
  },
  {
    icon: Star,
    title: 'Customer Satisfaction',
    description: 'Dedicated to providing exceptional service and memorable experiences'
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    text: 'The sarees at Kalyani Collections are absolutely stunning. The quality and craftsmanship are exceptional.',
    rating: 5
  },
  {
    name: 'Anita Patel',
    location: 'Delhi',
    text: 'I found the perfect lehenga for my wedding here. The staff was so helpful and the collection is amazing.',
    rating: 5
  },
  {
    name: 'Rekha Singh',
    location: 'Bangalore',
    text: 'Great variety of kurtas and the quality is top-notch. Highly recommended for traditional wear.',
    rating: 5
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="relative container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-accent-900 leading-tight">
                  Discover Your
                  <span className="text-gradient block">Perfect Look</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Explore our exquisite collection of authentic Indian wear. From elegant sarees 
                  to stunning lehengas, find the perfect outfit for your special moments.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="btn-primary inline-flex items-center justify-center">
                  Let's Shop
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/about" className="btn-outline inline-flex items-center justify-center">
                  Learn More
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-800">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-800">1000+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-800">5★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-model.jpg"
                    alt="Beautiful model in traditional Indian wear"
                    width={600}
                    height={600}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-300 rounded-full opacity-20 animate-bounce-gentle"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-300 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-900 mb-4">
              Explore Our Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated categories, each offering unique styles 
              and authentic craftsmanship for every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group card-hover"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-accent-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  {category.subcategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-900 mb-4">
              Why Choose Kalyani Collections?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the finest Indian wear and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-accent-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-accent-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-accent-800 to-accent-900 text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Perfect Outfit?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Visit our store or browse our online collection. Our team is here to help you 
              find the perfect piece for your special occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="bg-white text-accent-800 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/contact" className="border border-white text-white hover:bg-white hover:text-accent-800 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}