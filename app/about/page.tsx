import React from 'react';

export const metadata = {
  title: 'About Us | RxRush',
  description: 'Learn about RxRush - India\'s fastest online medicine delivery service with 30-minute delivery, 24/7 support, and up to 20% off on healthcare products.',
};

// Add loading state for better UX
export function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-gray-600">Loading about page...</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">RxRush – Online Medicine Delivery App</h1>
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              30-Minute Delivery
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              24/7 Support
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Up to 20% Off
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            Join 200+ happy customers who trust RxRush for fast, reliable, and hassle-free medicine delivery. 
            We make essential medicines and healthcare products accessible anytime, anywhere – delivered in just 30 minutes.
          </p>
          <p className="text-lg text-green-600 font-medium">
            Currently available in Bengaluru, Chennai, Coimbatore. Expanding soon to more cities across India.
          </p>
        </div>
      </section>

      {/* Why Choose RxRush Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose RxRush?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning-Fast 30-Minute Delivery</h3>
              <p className="text-gray-600">
                Skip long queues at pharmacies. RxRush delivers medicines, wellness products, and healthcare essentials 
                straight to your doorstep in just 30 minutes, 24/7.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expanding Nationwide</h3>
              <p className="text-gray-600">
                Currently serving Bengaluru, Chennai, Coimbatore, with plans to launch in more cities across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Up to 20% Off</h3>
              <p className="text-gray-600">
                Save more with exclusive discounts on essential medicines, personal care items, and wellness products.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Delivery on Orders Above ₹499</h3>
              <p className="text-gray-600">
                Enjoy free delivery when your order exceeds ₹499. Making healthcare affordable and accessible.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Availability</h3>
              <p className="text-gray-600">
                Order anytime – day or night – and we will deliver when you need it most.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Ordering</h3>
              <ul className="text-gray-600 list-disc list-inside space-y-2">
                <li>Search and Order Easily</li>
                <li>Instant Order Tracking</li>
                <li>Multiple Payment Options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Wide Range of Healthcare Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'General Medicines',
              'Diabetes and Heart Care',
              'Wellness and Nutrition',
              'Personal Care and Hygiene',
              'Baby and Mother Care',
              'Fitness and Lifestyle',
              'Medical Devices and Equipment'
            ].map((category) => (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <p className="text-lg font-medium text-gray-900">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust and Safety Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Expert Pharmacist Support</h2>
              <p className="text-gray-600">
                Need help choosing the right medicines? Our licensed pharmacists are available to guide you 24/7.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">100% Licensed and Verified</h2>
              <p className="text-gray-600">
                RxRush operates fully licensed pharmacy stores, ensuring all medicines and healthcare products 
                are sourced from verified suppliers and meet legal safety standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Delivery Section */}
      <section className="bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Safe, Secure, and Trustworthy Delivery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contactless and Hygienic</h3>
              <p className="text-gray-600">Your safety is our priority</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trained Professionals</h3>
              <p className="text-gray-600">Careful handling of medicines</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fastest Delivery</h3>
              <p className="text-gray-600">Get what you need in just 30 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Download RxRush today</h2>
          <p className="text-xl mb-8">Experience India's fastest online pharmacy.</p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Download Now
          </button>
        </div>
      </section>
    </div>
  );
} 