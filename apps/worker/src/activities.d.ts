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
export declare function sendEmail(params: SendEmailParams): Promise<SendEmailResult>;
//# sourceMappingURL=activities.d.ts.map