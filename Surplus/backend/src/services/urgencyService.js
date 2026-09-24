export const calculateUrgency = (deadline) => {
  const now = Date.now();
  const deadlineTime = new Date(deadline).getTime();

  const remainingMs = deadlineTime - now;
  const remainingHours = remainingMs / (1000 * 60 * 60);

  if (remainingHours <= 0) {
    return {
      level: "critical",
      score: 100,
      remainingMinutes: 0,
    };
  }

  if (remainingHours < 1) {
    return {
      level: "critical",
      score: 100,
      remainingMinutes: Math.round(remainingHours * 60),
    };
  }

  if (remainingHours < 2) {
    return {
      level: "high",
      score: 80,
      remainingMinutes: Math.round(remainingHours * 60),
    };
  }

  if (remainingHours < 4) {
    return {
      level: "medium",
      score: 55,
      remainingMinutes: Math.round(remainingHours * 60),
    };
  }

  return {
    level: "low",
    score: 25,
    remainingMinutes: Math.round(remainingHours * 60),
  };
};
