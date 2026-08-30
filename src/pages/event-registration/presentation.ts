export const interestsList = [
  "Music",
  "Technology",
  "Design",
  "Networking",
  "Business",
  "Health",
  "Art",
];

export const trustPoints = [
  "Secure registration",
  "Digital badge ready",
  "Fast check-in support",
];

export const hexToRgba = (hex: string, opacity: number) => {
  const clean = hex?.replace("#", "");
  if (!clean || clean.length !== 6) return `rgba(79, 70, 229, ${opacity})`;

  const bigint = Number.parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
