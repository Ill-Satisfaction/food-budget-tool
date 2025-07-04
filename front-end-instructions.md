# Food Budget Tool - Frontend Instructions

## Overview
This document outlines the main UI structure, components, and implementation notes for the Food Budget Tool web application, as observed from the provided screenshots. The app is built with Next.js, TypeScript, and Tailwind CSS.

---

## Main Pages & Features

### 1. Grocery Plan Page
- **Header:**
  - Title: "Grocery Plan"
  - Content 1: "Weekly Nutrition Goals"
- **Suggested Items:**
  - Cards for each item with:
    - Name, quantity, nutrition info, price, "Add to List" button
    - Short-term/long-term tags for if the product should be bought in bulk or as-needed
- **Available Items Table:**
  - List of items, price, category, "Add to List" button
  **Owned Items Sidebar**
  - List of items that the user already has available in a simple, CRUD format
- **Shopping List Sidebar:**
  - List of selected items with quantity controls and remove buttons
  - Estimated total price
  - "Save Shopping List" button

### 2. Meal Plan Page
- **Header:**
  - Title: "Meal Plan"
  - Content 1: "Weekly Nutrition"
- **Weekly Nutrition Overview:**
  - Cards for Calories, Protein, Carbs, Fat, Fiber (contribution towards weekly totals)
- **Ingredient Input:**
  - Input field for ingredients to prioritize
  - List of selected ingredients (removable tags)
- **Meal Suggestions:**
  - Select: Breakfast, Lunch, Dinner
  - Select: Number to feed
  - Select: Preparation Considerations (Time, Available Appliances, Available Pots/Pans)
  - Meal cards with:
    - Image, title, prep time, calories, 
    - Key nutrients (protein, carbs, fat, fiber)
    - "View Full Nutrition Details" button
  - **Meal Details Modal:**
    - Nutritional info (macros, vitamins, minerals)
    - Ingredients list

### 3. Preferences Page
- **Header:**
  - Title: "Your Food Preferences"
- **Dietary Restrictions & Allergies:**
  - Dropdown for dietary preferences
  - Checkboxes for allergies
- **Budget Preferences:**
  - Weekly food budget input
  - Target cost per meal dropdown
- **Time & Preparation Defaults:**
  - Prep time dropdown
  - Cooking style radio buttons
- **Favorite/Least Favorite Foods:**
  - Input fields and tag lists for favorite and least favorite ingredients
  - Add buttons

### 4. About Page
  - App Purpose
  - Link to 'Efficiency is Everything'

---

## General UI Notes
- **Navigation:**
  - Top navigation bar with app name and links: Grocery Plan, Meal Plan, Preferences, About
- **Design:**
  - Clean, modern, and minimal
  - Consistent use of green for primary actions and highlights
  - Cards and modals with subtle shadows and rounded corners
- **Responsiveness:**
  - Layout adapts for desktop and mobile

---

## Implementation Suggestions
- Use Tailwind CSS utility classes for layout, spacing, and colors
- Use React state/hooks for managing ingredient lists, preferences, and shopping list
- Use modals for meal details
- Use context or a global state manager for user preferences and shopping list if needed
- Consider accessibility (labels, focus states, keyboard navigation)

---

---

_Edit this file as needed to add more details or clarify implementation steps!_

## Feature List
Grocery Plan Page
Meal Plan Page
Preferences Page



## Relevant Documentation

 - make suggestions :)

## Current File Structure

ASCII

## Rules for File Organization

- All new components should be placed in the `/components` folder and named in a consistent format.
- All pages should be placed in the `app` folder.
- ??