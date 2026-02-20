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
  console.log("📧 [ACTIVITY] Sending email:");
  console.log(`   To: ${params.to}`);
  console.log(`   Subject: ${params.subject}`);
  console.log(`   Body: ${params.body}`);

  await new Promise((resolve) => setTimeout(resolve, 100));

  const result: SendEmailResult = {
    success: true,
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: Date.now(),
  };
  return result;
}
