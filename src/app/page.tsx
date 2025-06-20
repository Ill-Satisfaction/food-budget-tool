import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      title: 'Grocery Planning',
      description: 'Create smart shopping lists with nutrition tracking and cost optimization.',
      href: '/grocery-plan',
      icon: '🛒'
    },
    {
      title: 'Meal Ideas',
      description: 'Discover personalized meal suggestions based on your preferences and ingredients.',
      href: '/meal-ideas',
      icon: '🍽️'
    },
    {
      title: 'Preferences',
      description: 'Set your dietary restrictions, budget, and cooking preferences.',
      href: '/preferences',
      icon: '⚙️'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Food Budget Tool
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Plan your meals, optimize your grocery shopping, and maximize nutrition while staying within your budget. 
          Make smarter food decisions with our comprehensive planning tool.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/grocery-plan"
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
          >
            Start Planning
          </Link>
          <Link
            href="/about"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-sm border p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Why Use Food Budget Tool?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">Save Money</div>
            <p className="text-gray-600">Optimize your grocery spending with smart planning and cost tracking</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">Better Nutrition</div>
            <p className="text-gray-600">Track your nutritional goals and make informed food choices</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">Save Time</div>
            <p className="text-gray-600">Streamline your meal planning and shopping process</p>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-green-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Quick Start Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Set Preferences</h3>
            <p className="text-gray-600 text-sm">
              Configure your dietary restrictions, budget, and cooking preferences
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Plan Meals</h3>
            <p className="text-gray-600 text-sm">
              Browse meal suggestions and create your weekly meal plan
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Shop Smart</h3>
            <p className="text-gray-600 text-sm">
              Build your shopping list with cost tracking and nutrition info
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/preferences"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
