'use client';

import { useState } from 'react';

export default function PreferencesPage() {
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [weeklyBudget, setWeeklyBudget] = useState(100);
  const [targetCostPerMeal, setTargetCostPerMeal] = useState('5');
  const [prepTime, setPrepTime] = useState('30');
  const [cookingStyle, setCookingStyle] = useState('quick');
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>(['Chicken', 'Quinoa', 'Avocado']);
  const [leastFavoriteFoods, setLeastFavoriteFoods] = useState<string[]>(['Mushrooms', 'Olives']);
  const [favoriteInput, setFavoriteInput] = useState('');
  const [leastFavoriteInput, setLeastFavoriteInput] = useState('');

  const allergyOptions = [
    'Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish'
  ];

  const addFavoriteFood = () => {
    if (favoriteInput.trim() && !favoriteFoods.includes(favoriteInput.trim())) {
      setFavoriteFoods([...favoriteFoods, favoriteInput.trim()]);
      setFavoriteInput('');
    }
  };

  const removeFavoriteFood = (food: string) => {
    setFavoriteFoods(favoriteFoods.filter(f => f !== food));
  };

  const addLeastFavoriteFood = () => {
    if (leastFavoriteInput.trim() && !leastFavoriteFoods.includes(leastFavoriteInput.trim())) {
      setLeastFavoriteFoods([...leastFavoriteFoods, leastFavoriteInput.trim()]);
      setLeastFavoriteInput('');
    }
  };

  const removeLeastFavoriteFood = (food: string) => {
    setLeastFavoriteFoods(leastFavoriteFoods.filter(f => f !== food));
  };

  const toggleAllergy = (allergy: string) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter(a => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Food Preferences</h1>
      </div>

      <div className="space-y-8">
        {/* Dietary Restrictions & Allergies */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dietary Restrictions & Allergies</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Preference
              </label>
              <select
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="">No restrictions</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="dairy-free">Dairy-Free</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Allergies & Intolerances
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {allergyOptions.map((allergy) => (
                  <label key={allergy} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={allergies.includes(allergy)}
                      onChange={() => toggleAllergy(allergy)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{allergy}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Budget Preferences */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Preferences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Food Budget ($)
              </label>
              <input
                type="number"
                value={weeklyBudget}
                onChange={(e) => setWeeklyBudget(Number(e.target.value))}
                min="0"
                step="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Cost per Meal ($)
              </label>
              <select
                value={targetCostPerMeal}
                onChange={(e) => setTargetCostPerMeal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="3">$3 or less</option>
                <option value="5">$5 or less</option>
                <option value="8">$8 or less</option>
                <option value="12">$12 or less</option>
                <option value="15">$15 or less</option>
              </select>
            </div>
          </div>
        </section>

        {/* Time & Preparation Defaults */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Time & Preparation Defaults</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Prep Time
              </label>
              <select
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="15">15 minutes or less</option>
                <option value="30">30 minutes or less</option>
                <option value="45">45 minutes or less</option>
                <option value="60">60 minutes or less</option>
                <option value="90">90 minutes or less</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cooking Style Preference
              </label>
              <div className="space-y-2">
                {[
                  { value: 'quick', label: 'Quick & Easy' },
                  { value: 'baking', label: 'Baking' },
                  { value: 'grilling', label: 'Grilling' },
                  { value: 'slow-cooking', label: 'Slow Cooking' },
                  { value: 'stir-fry', label: 'Stir Fry' }
                ].map((style) => (
                  <label key={style.value} className="flex items-center">
                    <input
                      type="radio"
                      name="cookingStyle"
                      value={style.value}
                      checked={cookingStyle === style.value}
                      onChange={(e) => setCookingStyle(e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{style.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Favorite/Least Favorite Foods */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Food Preferences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Favorite Foods */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Favorite Foods</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={favoriteInput}
                  onChange={(e) => setFavoriteInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addFavoriteFood()}
                  placeholder="Add favorite food..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={addFavoriteFood}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {favoriteFoods.map((food) => (
                  <span
                    key={food}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {food}
                    <button
                      onClick={() => removeFavoriteFood(food)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Least Favorite Foods */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Least Favorite Foods</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={leastFavoriteInput}
                  onChange={(e) => setLeastFavoriteInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLeastFavoriteFood()}
                  placeholder="Add least favorite food..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={addLeastFavoriteFood}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {leastFavoriteFoods.map((food) => (
                  <span
                    key={food}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                  >
                    {food}
                    <button
                      onClick={() => removeLeastFavoriteFood(food)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
} 