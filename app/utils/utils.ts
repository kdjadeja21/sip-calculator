export function formatIndianRupees(number: number) {
  if (number >= 10000000) {
    return (number / 10000000).toFixed(2) + " cr";
  } else if (number >= 100000) {
    return (
      (number / 100000).toLocaleString("en-IN", { maximumFractionDigits: 2 }) +
      " lakhs"
    );
  } else {
    return (
      number.toLocaleString("en-IN", { maximumFractionDigits: 2 }) + " rupees"
    );
  }
}

export const CroresLacsFormatter = (value: number): string => {
  if (value >= 10000000) {
    return `${value / 10000000} Cr`;
  }
  if (value >= 100000) {
    return `${value / 100000} Lac`;
  }
  return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
};
