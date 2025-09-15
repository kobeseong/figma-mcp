import { apiErrorHandler, apiSuccessHandler } from '@/app/lib/apiErrorHandler';
import {
  completeProcessing,
  isCurrentlyProcessing,
  startProcessing,
} from '@/app/lib/processState';
import { exec } from 'child_process';
import { NextRequest } from 'next/server';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileKey, nodeId } = body;

    if (!fileKey || !nodeId) {
      return apiErrorHandler('fileKey와 nodeId는 필수 파라미터입니다.');
    }

    if (isCurrentlyProcessing()) {
      return apiErrorHandler('이미 다른 작업이 처리 중입니다');
    }

    const command = `codex exec "${PROMPT}"`;

    startProcessing();
    try {
      const { stdout } = await execAsync(command);
      console.log(stdout);

      completeProcessing();

      return apiSuccessHandler('codex 명령어가 성공적으로 실행되었습니다');
    } catch {
      completeProcessing();

      return apiErrorHandler('codex 명령어 실행에 실패했습니다');
    }
  } catch {
    completeProcessing();

    return apiErrorHandler('서버 오류가 발생했습니다');
  }
}

const PROMPT = `안녕하세요 인사를 해줘`;
