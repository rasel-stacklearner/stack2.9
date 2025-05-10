/**
 * Convert a string to title case.
 * @param str - The string to convert.
 * @param delimiter - The delimiter to replace with a space.
 * @returns The string in title case.
 */
export const toTitleCase = (str: string, delimiter: string = "_") => {
  // Replace delimiter with space, need to escape special characters
  const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const formattedStr = str.replace(new RegExp(escapedDelimiter, "g"), " ");

  return formattedStr.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

/**
 * Generate breadcrumb items from a path.
 * @param pathNames - The path to generate breadcrumbs from.
 * @param prefix - The prefix to skip.
 * @returns The breadcrumb items.
 */
export const generateBreadcrumb = (pathNames: string, prefix?: string) => {
  const pathWithoutQuery = pathNames.split("?")[0];
  if (!pathWithoutQuery) return [];

  const pathArray = pathWithoutQuery.split("/").filter((path) => path !== "");

  // Skip the prefix segment if it matches
  const startIndex = prefix && pathArray[0] === prefix ? 1 : 0;
  const relevantPaths = pathArray.slice(startIndex);

  const breadcrumb = relevantPaths.map((path, index) => {
    // Include all segments after prefix for href
    const href = pathArray.slice(0, startIndex + index + 1).join("/");
    const text = toTitleCase(path);
    return { text, href };
  });

  return breadcrumb;
};

// get only changed values from two objects
export function getChangedValues<T>(
  defaultValues: T,
  newValues: T
): Partial<T> {
  const changedValues = {} as Partial<T>;

  for (const key in defaultValues) {
    const defaultValue = defaultValues[key];
    const newValue = newValues[key];

    // Check if both values are arrays
    if (Array.isArray(defaultValue) && Array.isArray(newValue)) {
      // Compare stringified versions of arrays
      if (JSON.stringify(defaultValue) !== JSON.stringify(newValue)) {
        changedValues[key] = newValues[key];
      }
    } else if (defaultValue !== newValue) {
      // If not arrays, compare as is
      changedValues[key] = newValues[key];
    }
  }

  return changedValues;
}

// check if a string is a valid url
export const isValidUrl = (url: string) => {
  try {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?'+ // protocol
      '((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|'+ // domain name
      '(localhost)|'+ // localhost
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?'+ // port
      '(\\/[^\\s]*)*'+ // path
      '(\\?[^\\s]*)?'+ // query string
      '(#[^\\s]*)?$', // fragment
      'i' // case insensitive
    );
    return urlPattern.test(url);
  } catch (e) {
    return false;
  }
};
