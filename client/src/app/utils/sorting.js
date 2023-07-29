export function sorting(arr, { path, order }) {
  return arr.sort((a, b) => {
    switch (path) {
      case "name":
        if (order === "asc") {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        } else {
          if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
          if (b.name.toLowerCase() < a.name.toLowerCase()) return -1;
          return 0;
        }
      case "rate": {
        const rateA = a.rate.count / a.rate.amount || 0;
        const rateB = b.rate.count / b.rate.amount || 0;
        if (order === "asc") {
          return rateA - rateB;
        } else {
          return rateB - rateA;
        }
      }
      case "price":
        if (order === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      default:
        return 0;
    }
  });
}
