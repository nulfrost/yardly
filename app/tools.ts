import * as fs from "node:fs";

export const filePath = "count.txt";

export async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0"),
  );
}
