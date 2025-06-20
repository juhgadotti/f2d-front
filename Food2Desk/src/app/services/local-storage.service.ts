import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() {}

  // ✅ Método para salvar uma informação
  saveItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // ✅ Método para atualizar (basicamente sobrescreve o valor anterior)
  updateItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // ✅ Método para buscar uma informação
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  // (Opcional) ✅ Remover um item
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // (Opcional) ✅ Limpar todo o localStorage
  clear(): void {
    localStorage.clear();
  }
}
