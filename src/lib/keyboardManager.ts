import { EventEmitter } from 'events';

class KeyboardManager extends EventEmitter {
  private isListening = false;
  private pressedKeys = new Set<string>();

  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  public startListening(): void {
    if (this.isListening) return;

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    this.isListening = true;
  }

  public stopListening(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    this.isListening = false;
    this.pressedKeys.clear();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.pressedKeys.has(event.code)) {
      this.pressedKeys.add(event.code);
      this.emit('keyDown', event.code);
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    if (this.pressedKeys.has(event.code)) {
      this.pressedKeys.delete(event.code);
      this.emit('keyUp', event.code);
    }
  }

  public isKeyPressed(keyCode: string): boolean {
    return this.pressedKeys.has(keyCode);
  }

  public cleanup(): void {
    this.stopListening();
  }
}

export const keyboardManager = new KeyboardManager();