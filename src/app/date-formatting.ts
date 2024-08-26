const DateFormatter = {
  formatDate: (date: Date): string => {
    return date.toLocaleDateString("ro", {
      day: "numeric",
      month: "short",
    });
  },
};
export default DateFormatter;
