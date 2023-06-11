export const calculateTotals = (foodData) => {
  if (!foodData) {
    return {
      totalCalories: 0,
      totalCarbohydrates: 0,
      totalFats: 0,
      totalProteins: 0,
    };
  }

  const meals = Object.keys(foodData);
  let totalCalories = 0;
  let totalCarbohydrates = 0;
  let totalFats = 0;
  let totalProteins = 0;

  meals.forEach((meal) => {
    if (foodData[meal]?.foods) {
      foodData[meal].foods.forEach((food) => {
        totalCalories += food.calories;
        totalCarbohydrates += food.carbohydrates;
        totalFats += food.fats;
        totalProteins += food.proteins;
      });
    }
  });

  return { totalCalories, totalCarbohydrates, totalFats, totalProteins };
};

export const extractMealItems = (foodData) => {
  const breakfastItems = foodData?.Desayuno?.foods ?? [];
  const lunchItems = foodData?.Comida?.foods ?? [];
  const dinnerItems = foodData?.Cena?.foods ?? [];
  const snackItems = foodData?.Snack?.foods ?? [];

  return { breakfastItems, lunchItems, dinnerItems, snackItems };
};

export const getDisplayedDate = (displayedDate) => {
  const dateObj = new Date(displayedDate);
  const currentDate = new Date();
  const currentDateString = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  if (displayedDate === currentDateString) {
    return "Hoy";
  } else {
    const options = {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", options).format(dateObj);
  }
};
