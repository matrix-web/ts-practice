export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) => {
  const formatter = new Intl.DateTimeFormat(
    "ru-RU",
    options || {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  return formatter.format(date).split(".").reverse().join("-");
};

export function formatPrice(price: number): string {
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}

export function dateToUnixStamp(date: Date): number {
  return date.getTime() / 1000;
}

export class LocalStore {
  static getItem<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
