export const createPageUrl = (pageName: string): string => {
  const baseUrl = process.env.PUBLIC_URL || '';
  return `${baseUrl}/${pageName.toLowerCase()}`;
};
