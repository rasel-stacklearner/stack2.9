/**
 * Parses a cookie header string and returns an object containing the cookie key-value pairs
 * @param cookieHeader - The cookie header string
 * @returns - An object containing the cookie key-value pairs
 * @example ```ts
 * const cookieHeader = req.headers.get('Cookie');
  const parsedCookies = parseCookie(cookieHeader);
 * ```
  #### Example 1: cookie parsing
  ```ts
const basicCookie = 'username=john; token=abc123';
const result1 = parseCookie(basicCookie);
console.log(result1); // { username: 'john', token: 'abc123' }
```
 */
export const parseCookie = (
  cookieHeader: string | null
): Record<string, string> => {
  if (!cookieHeader) return {};

  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((c) => {
        const [k, v] = c.trim().split("=");
        return [k, v ? decodeURIComponent(v) : null];
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, v]) => v !== null) // Filter out entries with null values
  );
};
