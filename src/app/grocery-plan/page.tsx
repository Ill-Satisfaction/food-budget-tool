'use client';

import { useState } from 'react';
import SuggestedItemsOptionsMenu from '@/components/SuggestedItemsOptionsMenu';

interface GroceryItem {
  id: string;
  name: string;
  price: number;
  category: string;
  pricePerPound?: number;
  tags?: string[];
  quantitySuggested?: number;
  unit?: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  quantity?: number;
}

const initialSuggestedItems: GroceryItem[] = [
  {
    id: 's1',
    name: 'Chicken Breast',
    price: 12.99,
    pricePerPound: 4.99,
    category: 'Protein',
    tags: ['perishable', 'high-protein'],
    quantitySuggested: 2,
    unit: 'lbs',
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
  },
  {
    id: 's2',
    name: 'Quinoa',
    price: 6.99,
    pricePerPound: 5.49,
    category: 'Grains',
    tags: ['non-perishable', 'nutrient-dense'],
    quantitySuggested: 1,
    unit: 'bag',
    nutrition: { calories: 120, protein: 4.4, carbs: 22, fat: 1.9, fiber: 2.8 },
  },
  {
    id: 's3',
    name: 'Spinach',
    price: 3.99,
    pricePerPound: 3.99,
    category: 'Vegetables',
    tags: ['perishable', 'nutrient-dense'],
    quantitySuggested: 1,
    unit: 'bag',
    nutrition: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
  },
  {
    id: 's7',
    name: 'Chicken Eggs',
    price: 3.49,
    category: 'Protein',
    tags: ['perishable', 'high-protein'],
    quantitySuggested: 12,
    unit: 'ct',
    nutrition: { calories: 78, protein: 6, carbs: 0.6, fat: 5, fiber: 0 },
  }
];

const suggestionPool: GroceryItem[] = [
    { id: 's4', name: 'Almonds', price: 9.49, category: 'Nuts', tags: ['non-perishable', 'high-protein'], nutrition: { calories: 579, protein: 21, carbs: 22, fat: 49, fiber: 12 } },
    { id: 's5', name: 'Oats', price: 4.29, category: 'Grains', tags: ['non-perishable', 'nutrient-dense'], nutrition: { calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 11 } },
    { id: 's6', name: 'Avocado', price: 2.50, category: 'Fruit', tags: ['perishable'], nutrition: { calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 } },
];

export default function GroceryPlanPage() {
  const [shoppingList, setShoppingList] = useState<GroceryItem[]>([]);
  const [ownedItems, setOwnedItems] = useState<GroceryItem[]>([
    { id: 'o1', name: 'Rice', price: 3.99, category: 'Grains' },
    { id: 'o2', name: 'Olive Oil', price: 8.99, category: 'Oils' },
  ]);
  const [suggestedItems, setSuggestedItems] = useState<GroceryItem[]>(initialSuggestedItems);
  const [dislikedFoods, setDislikedFoods] = useState<string[]>([]);
  const [detailedItem, setDetailedItem] = useState<GroceryItem | null>(null);


  const availableItems: GroceryItem[] = [
    { id: 'a1', name: 'Ground Beef', price: 8.99, category: 'Protein' },
    { id: 'a2', name: 'Salmon', price: 15.99, category: 'Protein' },
    { id: 'a3', name: 'Broccoli', price: 2.99, category: 'Vegetables' },
    { id: 'a4', name: 'Sweet Potatoes', price: 4.99, category: 'Vegetables' },
    { id: 'a5', name: 'Greek Yogurt', price: 5.99, category: 'Dairy' },
  ];

  const addToShoppingList = (item: GroceryItem) => {
    setShoppingList(currentList => {
      const existingItem = currentList.find(i => i.id === item.id);
      if (existingItem) {
        return currentList.map(i => 
          i.id === item.id 
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...currentList, { ...item, quantity: 1 }];
    });
    // Also remove from suggestions
    setSuggestedItems(currentSuggested => currentSuggested.filter(i => i.id !== item.id));
  };

  const addAllSuggestedToList = () => {
    let listWithAdditions = [...shoppingList];
    suggestedItems.forEach(itemToAdd => {
      const existingItemIndex = listWithAdditions.findIndex(i => i.id === itemToAdd.id);
      if (existingItemIndex > -1) {
        const existingItem = listWithAdditions[existingItemIndex];
        listWithAdditions[existingItemIndex] = { ...existingItem, quantity: (existingItem.quantity || 1) + 1 };
      } else {
        listWithAdditions.push({ ...itemToAdd, quantity: 1 });
      }
    });
    setShoppingList(listWithAdditions);
    setSuggestedItems([]);
  };

  const markAsOwned = (itemToOwn: GroceryItem) => {
    setOwnedItems(currentOwned => [...currentOwned, { ...itemToOwn, id: `o${currentOwned.length + 3}` }]);
    setSuggestedItems(currentSuggested => currentSuggested.filter(i => i.id !== itemToOwn.id));
  };
  
  const removeFromOwned = (itemId: string) => {
    setOwnedItems(currentOwned => currentOwned.filter(i => i.id !== itemId));
  };

  const replaceAndDislike = (itemToReplace: GroceryItem) => {
    console.log(`User dislikes ${itemToReplace.name}. Adding to disliked list for this session.`);
    setDislikedFoods(current => [...current, itemToReplace.name]);

    const currentSuggestionIds = suggestedItems.map(i => i.id);
    const replacement = suggestionPool.find(p => !currentSuggestionIds.includes(p.id));

    if (replacement) {
      setSuggestedItems(current => 
          current.map(i => (i.id === itemToReplace.id ? replacement : i))
      );
    } else {
      setSuggestedItems(current => current.filter(i => i.id !== itemToReplace.id));
      console.log("Suggestion pool exhausted.");
    }
  };

  const removeFromShoppingList = (itemId: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromShoppingList(itemId);
    } else {
      setShoppingList(shoppingList.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = shoppingList.reduce((sum, item) => 
    sum + (item.price * (item.quantity || 1)), 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Grocery Plan</h1>
        <p className="text-lg text-gray-600 mt-2">Weekly Nutrition Goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Suggested Items */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Suggested Items</h2>
              {suggestedItems.length > 0 && (
                <button
                  onClick={addAllSuggestedToList}
                  className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition-colors"
                >
                  Add All to List
                </button>
              )}
            </div>
            {suggestedItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{item.name}{item.quantitySuggested && item.unit ? `, ${item.quantitySuggested}${item.unit}` : ''}</h3>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {item.pricePerPound && (
                          <div>estimated ${item.pricePerPound.toFixed(2)} per pound</div>
                        )}
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.map(tag => (
                            <span
                              key={tag}
                              className={`px-2 py-1 text-xs rounded-full ${
                                tag === 'perishable'
                                  ? 'bg-blue-100 text-blue-800'
                                  : tag === 'non-perishable'
                                  ? 'bg-orange-100 text-orange-800'
                                  : tag === 'high-protein'
                                  ? 'bg-red-100 text-red-800'
                                  : tag === 'nutrient-dense'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {tag.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-3 mt-3 flex justify-between items-center">
                      <div>
                        <span className="font-medium text-green-600 text-lg">est. ${item.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToShoppingList(item)}
                          className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center"
                          aria-label="Add to list"
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </button>
                        <SuggestedItemsOptionsMenu 
                          onViewDetails={() => setDetailedItem(item)}
                          onDislike={() => replaceAndDislike(item)}
                          onMarkAsOwned={() => markAsOwned(item)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No more suggestions at the moment.</p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              All prices shown are estimates and may not reflect the final cost at the store.
            </p>
          </section>

          {/* Available Items Table */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Items</h2>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {availableItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => addToShoppingList(item)}
                          className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
                        >
                          Add to List
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Owned Items */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Owned Items</h3>
            {ownedItems.length > 0 ? (
              <div className="space-y-2">
                {ownedItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-500 ml-2">{item.category}</span>
                    </div>
                    <button
                      onClick={() => removeFromOwned(item.id)}
                      className="text-red-500 hover:text-red-700 text-lg"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">You do not own any items yet.</p>
            )}
          </div>

          {/* Shopping List */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shopping List</h3>
            {shoppingList.length === 0 ? (
              <p className="text-gray-500 text-sm">No items in your shopping list</p>
            ) : (
              <div className="space-y-3">
                {shoppingList.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm w-8 text-center text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromShoppingList(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-900">Estimated Total:</span>
                    <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600">
                  Save Shopping List
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nutritional Details Modal */}
      {detailedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{detailedItem.name}</h2>
                <button
                  onClick={() => setDetailedItem(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutritional Information</h3>
                {detailedItem.nutrition ? (
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between"><span>Calories:</span><span className="font-medium text-gray-900">{detailedItem.nutrition.calories} kcal</span></div>
                    <div className="flex justify-between"><span>Protein:</span><span className="font-medium text-gray-900">{detailedItem.nutrition.protein}g</span></div>
                    <div className="flex justify-between"><span>Carbohydrates:</span><span className="font-medium text-gray-900">{detailedItem.nutrition.carbs}g</span></div>
                    <div className="flex justify-between"><span>Fat:</span><span className="font-medium text-gray-900">{detailedItem.nutrition.fat}g</span></div>
                    <div className="flex justify-between"><span>Fiber:</span><span className="font-medium text-gray-900">{detailedItem.nutrition.fiber}g</span></div>
                  </div>
                ) : (
                  <p className="text-gray-600">No detailed nutritional information available.</p>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Price: ${detailedItem.price.toFixed(2)}</span>
                  <span>Category: {detailedItem.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 