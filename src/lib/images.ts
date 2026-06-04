export const MODERN_PHONE_REPAIR_IMAGE = "/modern_phone_repair_lab.png";

const oldPhoneImagePatterns = [
  "Android-Telefon-Tamiri",
  "teknoway.com.tr/wp-content/uploads/2022/07",
  "telefon-tamiri",
  "phone-repair",
];

export function resolveNewsImage(imageUrl?: string) {
  if (!imageUrl) return MODERN_PHONE_REPAIR_IMAGE;

  const normalizedUrl = imageUrl.toLowerCase();
  const isOldPhoneImage = oldPhoneImagePatterns.some((pattern) =>
    normalizedUrl.includes(pattern.toLowerCase())
  );

  return isOldPhoneImage ? MODERN_PHONE_REPAIR_IMAGE : imageUrl;
}
