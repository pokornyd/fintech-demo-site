import { writeJson } from './fileSystem';

interface ISavedApiKeys {
  [projectId: string]: string;
}

const FileName = 'apiKeys.json';

export const getApiKeyFromFile = async (projectId: string): Promise<string | undefined> => {
  const {
    loadJson,
  } = await import('./fileSystem');
  const apiKeys = loadJson<ISavedApiKeys>(FileName);
  return apiKeys[projectId];
};

export const saveApiKeyToFile = async (projectId: string, apiKey: string): Promise<void> => {
  const {
    loadJson,
    writeJson,
  } = await import('./fileSystem');
  const apiKeys = loadJson<ISavedApiKeys>(FileName);
  const newApiKeys = {
    ...apiKeys,
    [projectId]: apiKey,
  };
  writeJson(FileName, newApiKeys);
};

export const removeApiKeyFromFile = async (projectId: string): Promise<void> => {
  const {
    loadJson,
  } = await import('./fileSystem');
  const apiKeys = loadJson<ISavedApiKeys>(FileName);
  const { [projectId]: forget1, ...newApiKeys } = apiKeys;
  writeJson(FileName, newApiKeys);
};
