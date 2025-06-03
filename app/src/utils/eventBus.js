// src/utils/eventBus.js
const eventBus = {
  listeners: {}, // Objeto para almacenar los escuchadores de eventos

  // Método para suscribirse a un evento
  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  },

  // Método para dejar de escuchar un evento
  off(eventName, callback) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== callback
    );
  },

  // Método para emitir un evento
  emit(eventName, data) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName].forEach((listener) => listener(data));
  },
};

export default eventBus;