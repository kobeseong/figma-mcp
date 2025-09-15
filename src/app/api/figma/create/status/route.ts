import { apiErrorHandler, apiSuccessHandler } from '@/app/lib/apiErrorHandler';
import { getProcessState } from '@/app/lib/processState';

export async function GET() {
  try {
    const state = getProcessState();

    return apiSuccessHandler('상태 조회 성공', {
      isProcessing: state.isProcessing,
    });
  } catch {
    return apiErrorHandler('상태 조회 중 오류가 발생했습니다');
  }
}
