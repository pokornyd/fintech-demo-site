import fs from 'fs';

export const loadJson = <T extends {} = any>(path: string): T => {
  try {
    const fileContent = fs.readFileSync(path, { encoding: 'utf8' });
    return JSON.parse(fileContent);
  }
  catch (e) {
    console.error(e);
  }
  return {} as T;
};

export const writeJson = (path: string, content: any) => {
  fs.writeFileSync(path, JSON.stringify(content, null, 2), { encoding: 'utf8' });
};
