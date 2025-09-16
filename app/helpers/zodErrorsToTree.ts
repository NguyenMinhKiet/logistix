import { ZodError } from 'zod';

export function zodErrorsToTree(err: ZodError): Record<string, any> {
    const errors: Record<string, any> = {};

    for (const issue of err.issues) {
        let curr = errors;

        // Nếu path rỗng => lỗi form global
        if (issue.path.length === 0) {
            if (!curr['_form']) curr['_form'] = [];
            curr['_form'].push(issue.message);
            continue;
        }

        // Duyệt path để tạo nested object
        for (let i = 0; i < issue.path.length; i++) {
            const key = String(issue.path[i]);

            // Nếu là cuối path => gán mảng lỗi
            if (i === issue.path.length - 1) {
                if (!curr[key]) curr[key] = [];
                curr[key].push(issue.message);
            } else {
                if (!curr[key]) curr[key] = {};
                curr = curr[key];
            }
        }
    }

    return errors;
}
