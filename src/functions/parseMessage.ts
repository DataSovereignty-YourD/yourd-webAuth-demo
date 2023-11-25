export default function parseWebSocketMessage(message: string) {
    // 문자열이고, 유효한 JSON 형식인지 확인
    if (typeof message === 'string' && message.trim().startsWith('{')) {
      try {
        return JSON.parse(message);
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    }
    return message;
  }