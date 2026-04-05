export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const groupByCategory = (transactions) => {
  const grouped = {};
  transactions.forEach((t) => {
    const category = t.category || "Other";
    if (!grouped[category]) {
      grouped[category] = { category, total: 0, count: 0 };
    }
    grouped[category].total += t.amount;
    grouped[category].count += 1;
  });
  return Object.values(grouped);
};

export const groupByMonth = (transactions) => {
  const grouped = {};
  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    if (!grouped[key]) {
      grouped[key] = { month: label, income: 0, expenses: 0, balance: 0 };
    }
    if (t.type === "income") {
      grouped[key].income += t.amount;
    } else {
      grouped[key].expenses += t.amount;
    }
    grouped[key].balance = grouped[key].income - grouped[key].expenses;
  });
  return Object.keys(grouped)
    .sort()
    .map((key) => grouped[key]);
};

export const calculateSummary = (transactions) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  return {
    income,
    expenses,
    balance: income - expenses,
    transactionCount: transactions.length,
  };
};
