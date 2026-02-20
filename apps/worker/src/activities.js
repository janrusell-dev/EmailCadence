"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
async function sendEmail(params) {
    console.log("📧 [ACTIVITY] Sending email:");
    console.log(`   To: ${params.to}`);
    console.log(`   Subject: ${params.subject}`);
    console.log(`   Body: ${params.body}`);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const result = {
        success: true,
        messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: Date.now(),
    };
    return result;
}
//# sourceMappingURL=activities.js.map