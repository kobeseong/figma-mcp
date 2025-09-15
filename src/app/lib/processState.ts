// 메모리 기반 전역 상태 관리
interface ProcessState {
  isProcessing: boolean;
}

// 전역 상태 객체
const globalState: ProcessState = {
  isProcessing: false,
};

export function getProcessState(): ProcessState {
  return { ...globalState };
}

export function startProcessing() {
  globalState.isProcessing = true;
}

export function completeProcessing() {
  globalState.isProcessing = false;
}

export function isCurrentlyProcessing(): boolean {
  return globalState.isProcessing;
}

export function cancelCurrentProcess(): boolean {
  if (!globalState.isProcessing) {
    return false;
  }

  completeProcessing();
  return true;
}
