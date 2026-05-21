import { z } from 'zod';

export const WebhookPayloadSchema = z.object({
  adId: z.string().min(1, "adId is required"),
  tenantId: z.string().min(1, "tenantId is required"),
  violationType: z.enum(['PROHIBITED_TERM', 'BRAND_VIOLATION', 'COMPLIANCE_FAIL']),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  detectedAt: z.string().datetime({
    message: "detectedAt must be a valid ISO 8601 datetime",
  }),
});

export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>;
