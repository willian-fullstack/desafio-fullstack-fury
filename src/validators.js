"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookPayloadSchema = void 0;
const zod_1 = require("zod");
exports.WebhookPayloadSchema = zod_1.z.object({
    adId: zod_1.z.string({
        required_error: "adId is required",
        invalid_type_error: "adId must be a string",
    }),
    tenantId: zod_1.z.string({
        required_error: "tenantId is required",
        invalid_type_error: "tenantId must be a string",
    }),
    violationType: zod_1.z.enum(['PROHIBITED_TERM', 'BRAND_VIOLATION', 'COMPLIANCE_FAIL'], {
        required_error: "violationType is required",
        invalid_type_error: "violationType must be one of: PROHIBITED_TERM, BRAND_VIOLATION, COMPLIANCE_FAIL",
    }),
    severity: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], {
        required_error: "severity is required",
        invalid_type_error: "severity must be one of: LOW, MEDIUM, HIGH, CRITICAL",
    }),
    detectedAt: zod_1.z.string().datetime({
        message: "detectedAt must be a valid ISO 8601 datetime",
    }),
});
//# sourceMappingURL=validators.js.map