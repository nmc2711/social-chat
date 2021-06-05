import React from "react";
import ReactDOM from "react-dom";
import Toast from "./Toast";

export class ToastManager {
  containerRef;
  toasts = [];

  constructor() {
    const body = document.getElementsByTagName("body")[0];
    const toastContainer = document.createElement("div");
    toastContainer.id = "toastContainerMain";

    body.insertAdjacentElement("beforeend", toastContainer);

    this.containerRef = toastContainer;
  }

  show(options) {
    const toastId = Math.random().toString(36).substr(2, 9);
    const toast = {
      id: toastId,
      ...options,
      destory: () => this.destory(options.id ?? toastId),
    };

    this.toasts = [toast, ...this.toasts];
    this.render();
  }

  destory(id) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.render();
  }

  render() {
    const toastList = this.toasts.map((toastProps) => (
      <Toast key={toastProps.id} {...toastProps} />
    ));
    ReactDOM.render(toastList, this.containerRef);
  }
}

export const toast = new ToastManager();
