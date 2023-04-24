export class HttpHelper {
  /**
   * метод выполняет запрос и преобразует ответ в JSON
   * Тип ответа будет взят из dgeneric параметра Response
   */
  public static fetchAsJson<Response>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    return fetch(input, init)
      .then((response) => {
        return response.text();
      })
      .then<Response>((responseText) => {
        return JSON.parse(responseText);
      });
  }
}
