import type { MessageBoxInstance } from './MessageBox';

export interface MessageBoxProps {
  title?: string;
  text?: string;
  beforeClose?: ((action: string, compInstance: MessageBoxInstance, done: () => void) => unknown) | null
}
