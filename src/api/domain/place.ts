export class Place {
  constructor(
    private readonly provider: string,
    public readonly originalId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly image: string | string[],
    public readonly remoteness: number | number[],
    public readonly bookedDates: number[],
    public readonly price: number
  ) {}

  /**
   * Возможно совпадение ID в разных источниках
   * Поэтому генерируем ID для внутреннего использования
   * Настоящий ID также доступен через originalId
   */
  get id(): string {
    return `${this.provider}-${this.originalId}`;
  }
  /**
   * Метод для установления источника
   */
  public isProvidedBy(providerName: string): boolean {
    return this.provider === providerName;
  }
}
