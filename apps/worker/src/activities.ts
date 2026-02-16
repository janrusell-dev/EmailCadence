export interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId: string;
  timestamp: number;
}

export async function sendEmail(
  params: SendEmailParams,
): Promise<SendEmailResult> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const result: SendEmailResult = {
    success: true,
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };
  return result;
}
