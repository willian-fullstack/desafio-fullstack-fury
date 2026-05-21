import { z } from 'zod';
export declare const WebhookPayloadSchema: z.ZodObject<{
    adId: z.ZodString;
    tenantId: z.ZodString;
    violationType: z.ZodEnum<{
        PROHIBITED_TERM: "PROHIBITED_TERM";
        BRAND_VIOLATION: "BRAND_VIOLATION";
        COMPLIANCE_FAIL: "COMPLIANCE_FAIL";
    }>;
    severity: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        CRITICAL: "CRITICAL";
    }>;
    detectedAt: z.ZodString;
}, z.core.$strip>;
export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>;
//# sourceMappingURL=validators.d.ts.map