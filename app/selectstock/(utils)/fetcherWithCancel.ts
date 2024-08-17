export default async function fetcherWithCancel(
  url: string,
  newCancelToken: () => AbortController,
  isAbortError: (error: any) => boolean,
) {
  try {
    const response = await fetch(url, {
      signal: newCancelToken().signal,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    if (isAbortError(error)) {
      console.log(`aborted:${url}`);
    }
  }
}
