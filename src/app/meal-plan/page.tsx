'use client';

import { useState } from 'react';

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface Meal {
  id: string;
  title: string;
  prepTime: number;
  calories: number;
  nutrition: NutritionInfo;
  image?: string;
  ingredients: string[];
}

export default function MealPlanPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [mealType, setMealType] = useState('all');
  const [servings, setServings] = useState(2);
  const [prepTime, setPrepTime] = useState('30');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const weeklyNutrition = [
    { name: 'Calories', value: 1200, target: 2000, unit: 'kcal' },
    { name: 'Protein', value: 45, target: 80, unit: 'g' },
    { name: 'Carbs', value: 120, target: 250, unit: 'g' },
    { name: 'Fat', value: 35, target: 65, unit: 'g' },
    { name: 'Fiber', value: 18, target: 25, unit: 'g' },
  ];

  const meals: Meal[] = [
    {
      id: '1',
      title: 'Grilled Chicken Salad',
      prepTime: 20,
      calories: 350,
      nutrition: { calories: 350, protein: 35, carbs: 15, fat: 12, fiber: 8 },
      ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil']
    },
    {
      id: '2',
      title: 'Quinoa Buddha Bowl',
      prepTime: 25,
      calories: 420,
      nutrition: { calories: 420, protein: 18, carbs: 45, fat: 15, fiber: 12 },
      ingredients: ['Quinoa', 'Sweet potato', 'Kale', 'Chickpeas', 'Tahini dressing']
    },
    {
      id: '3',
      title: 'Salmon with Roasted Vegetables',
      prepTime: 30,
      calories: 380,
      nutrition: { calories: 380, protein: 28, carbs: 20, fat: 18, fiber: 6 },
      ingredients: ['Salmon fillet', 'Broccoli', 'Carrots', 'Lemon', 'Herbs']
    },
    {
      id: '4',
      title: 'Greek Yogurt Parfait',
      prepTime: 10,
      calories: 280,
      nutrition: { calories: 280, protein: 22, carbs: 35, fat: 8, fiber: 4 },
      ingredients: ['Greek yogurt', 'Berries', 'Honey', 'Granola', 'Nuts']
    }
  ];

  const addIngredient = () => {
    if (ingredientInput.trim() && !selectedIngredients.includes(ingredientInput.trim())) {
      setSelectedIngredients([...selectedIngredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Meal Plan</h1>
        <p className="text-lg text-gray-600 mt-2">Weekly Nutrition</p>
      </div>

      {/* Weekly Nutrition Overview */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Nutrition Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {weeklyNutrition.map((item) => {
            const percentage = (item.value / item.target) * 100;
            return (
              <div key={item.name} className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">{item.name}</h3>
                <div className="text-2xl font-bold text-green-600">{item.value}</div>
                <div className="text-xs text-gray-500">of {item.target} {item.unit}</div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ingredient Input */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Prioritize Ingredients</h2>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter an ingredient..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-500"
            />
            <button
              onClick={addIngredient}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add
            </button>
          </div>
          {selectedIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Meal Filters */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Meal Suggestions</h2>
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="all">All Meals</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number to Feed</label>
              <select
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value={1}>1 person</option>
                <option value={2}>2 people</option>
                <option value={4}>4 people</option>
                <option value={6}>6 people</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time</label>
              <select
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="15">15 min or less</option>
                <option value="30">30 min or less</option>
                <option value="45">45 min or less</option>
                <option value="60">60 min or less</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Style</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900">
                <option value="any">Any style</option>
                <option value="quick">Quick & Easy</option>
                <option value="baking">Baking</option>
                <option value="grilling">Grilling</option>
              </select>
            </div>
          </div>
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{meal.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <span>⏱️ {meal.prepTime} min</span>
                  <span className="mx-2">•</span>
                  <span>🔥 {meal.calories} cal</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                  <div>Protein: {meal.nutrition.protein}g</div>
                  <div>Carbs: {meal.nutrition.carbs}g</div>
                  <div>Fat: {meal.nutrition.fat}g</div>
                  <div>Fiber: {meal.nutrition.fiber}g</div>
                </div>
                <button
                  onClick={() => setSelectedMeal(meal)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  View Full Nutrition Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meal Details Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedMeal.title}</h2>
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutritional Information</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Calories:</span>
                      <span className="font-medium text-gray-900">{selectedMeal.nutrition.calories} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein:</span>
                      <span className="font-medium text-gray-900">{selectedMeal.nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbohydrates:</span>
                      <span className="font-medium text-gray-900">{selectedMeal.nutrition.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fat:</span>
                      <span className="font-medium text-gray-900">{selectedMeal.nutrition.fat}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fiber:</span>
                      <span className="font-medium text-gray-900">{selectedMeal.nutrition.fiber}g</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                  <ul className="space-y-1 text-sm text-gray-800">
                    {selectedMeal.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Prep Time: {selectedMeal.prepTime} minutes</span>
                  <span>Calories: {selectedMeal.calories} kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 