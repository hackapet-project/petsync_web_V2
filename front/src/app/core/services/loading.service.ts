import { Injectable, signal } from '@angular/core';

export interface LoadingState {
  isLoading: boolean;
  operation?: string;
  progress?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loadingState = signal<LoadingState>({ isLoading: false });

  readonly loading = this.loadingState.asReadonly();

  startLoading(operation?: string): void {
    this.loadingState.set({
      isLoading: true,
      operation,
      progress: 0
    });
  }

  updateProgress(progress: number): void {
    this.loadingState.update(state => ({
      ...state,
      progress: Math.max(0, Math.min(100, progress))
    }));
  }

  stopLoading(): void {
    this.loadingState.set({ isLoading: false });
  }

  isCurrentlyLoading(): boolean {
    return this.loadingState().isLoading;
  }

  getCurrentOperation(): string | undefined {
    return this.loadingState().operation;
  }
}