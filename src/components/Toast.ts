import { Statuses } from "../helpers/interfaces.js";

interface IMessage {
  type: Statuses;
  text: string;
}

interface IAction {
  name: string;
  handler: () => void;
}

export class Toast {
  render(message: IMessage | null, action?: IAction) {
    let messageText: string = "";

    if (message) {
      messageText = `
        <div id="info-block" class="info-block ${message.type}">
          <p>${message.text}</p>
          <button id="toast-main-action">${action?.name || "Закрыть"}</button>
        </div>
      `;
    }

    const toastBlockElement = <HTMLElement>(
      document.querySelector("#toast-block")
    );

    if (toastBlockElement) {
      toastBlockElement.innerHTML = messageText;

      const button = <HTMLElement>document.querySelector("#toast-main-action");

      if (button) {
        button.addEventListener("click", () => {
          if (action !== null && action?.handler !== null) {
            action?.handler();
          }

          this.render(null);
        });
      }
    }
  }
}
