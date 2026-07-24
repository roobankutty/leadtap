import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.join(
  process.cwd(),
  "data",
  "settings.json"
);

export async function getSettings() {

  try {

    const data = await fs.readFile(
      FILE_PATH,
      "utf-8"
    );

    return JSON.parse(data);

  } catch {

    return {};

  }

}


export async function saveSettings(settings: any) {

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(settings, null, 2)
  );

  return settings;

}