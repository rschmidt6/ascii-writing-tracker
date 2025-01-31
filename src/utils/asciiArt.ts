export const generateAsciiHeader = (date: string) => `
╔══════════════════════════════════════════╗
║         ASCII Writing Tracker            ║
║         ${date}                  ║
╚══════════════════════════════════════════╝`;

export const generateProgressBar = (current: number, total: number) => {
  const progress = Math.floor((current / total) * 20);
  return `[${">".repeat(progress)}${"-".repeat(
    20 - progress
  )}] ${current}/${total}`;
};
