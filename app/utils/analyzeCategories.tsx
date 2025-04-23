import categoryMap from "../data/valueCategories.json";

export function analyzeCategories(topValues: string[]): {
    dominantCategories: string[];
    categoryCounts: Record<string, number>;} 
  {
    const counts: Record<string, number> = {};
  
    topValues.forEach((value) => {
      const match = categoryMap.find(entry => entry.value === value);
      if (!match) return;
  
      match.categories.forEach((category) => {
        counts[category] = (counts[category] || 0) + 1;
      });
    });
  
    // Find max count
    const maxCount = Math.max(...Object.values(counts));
    const dominantCategories = Object.entries(counts)
      .filter(([_, count]) => count === maxCount)
      .map(([cat]) => cat);
  
    return {
      dominantCategories,
      categoryCounts: counts
    };
  }
  