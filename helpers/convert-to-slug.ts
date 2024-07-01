import unidecode from "unidecode";

export const convertToSlug = (text: string): string => {
  const unidecodeText : string = unidecode(text);

  const slug: string = unidecodeText.replace(/\s+/g, "-").replace(/-+/g, "-");

  return slug;
};
