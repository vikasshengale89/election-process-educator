export const logger = {
  info: (message: string, ...meta: unknown[]) => {
    // In a real application, this would send logs to a central service
    process.stdout.write(`[INFO] ${message} ${meta.length ? JSON.stringify(meta) : ''}\n`);
  },
  error: (message: string, ...meta: unknown[]) => {
    // In a real application, this would send logs to a central service
    process.stderr.write(`[ERROR] ${message} ${meta.length ? JSON.stringify(meta) : ''}\n`);
  },
  warn: (message: string, ...meta: unknown[]) => {
    process.stdout.write(`[WARN] ${message} ${meta.length ? JSON.stringify(meta) : ''}\n`);
  }
};
