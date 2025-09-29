import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with loading false', () => {
    expect(service.loading().isLoading).toBe(false);
    expect(service.isCurrentlyLoading()).toBe(false);
  });

  it('should start loading', () => {
    service.startLoading('Test operation');

    expect(service.loading().isLoading).toBe(true);
    expect(service.loading().operation).toBe('Test operation');
    expect(service.loading().progress).toBe(0);
    expect(service.isCurrentlyLoading()).toBe(true);
    expect(service.getCurrentOperation()).toBe('Test operation');
  });

  it('should update progress', () => {
    service.startLoading('Test');
    service.updateProgress(50);

    expect(service.loading().progress).toBe(50);
  });

  it('should clamp progress values', () => {
    service.startLoading('Test');

    service.updateProgress(-10);
    expect(service.loading().progress).toBe(0);

    service.updateProgress(150);
    expect(service.loading().progress).toBe(100);
  });

  it('should stop loading', () => {
    service.startLoading('Test operation');
    service.stopLoading();

    expect(service.loading().isLoading).toBe(false);
    expect(service.isCurrentlyLoading()).toBe(false);
  });
});