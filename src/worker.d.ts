import { Worker } from 'bullmq';
export declare const takedownWorker: Worker<{
    adId: string;
    tenantId: string;
    violationType: "PROHIBITED_TERM" | "BRAND_VIOLATION" | "COMPLIANCE_FAIL";
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    detectedAt: string;
}, any, string>;
//# sourceMappingURL=worker.d.ts.map