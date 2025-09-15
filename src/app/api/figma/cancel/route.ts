import { apiErrorHandler, apiSuccessHandler } from '@/app/lib/apiErrorHandler';
import {
  cancelCurrentProcess,
  isCurrentlyProcessing,
} from '@/app/lib/processState';

export async function POST() {
  try {
    if (!isCurrentlyProcessing()) {
      return apiErrorHandler('현재 실행 중인 작업이 없습니다');
    }
    const cancelResult = cancelCurrentProcess();

    if (cancelResult) {
      return apiSuccessHandler('작업이 성공적으로 취소되었습니다', {
        cancelled: true,
      });
    } else {
      return apiErrorHandler('작업 취소에 실패했습니다');
    }
  } catch {
    return apiErrorHandler('취소 요청 처리 중 오류가 발생했습니다');
  }
}
