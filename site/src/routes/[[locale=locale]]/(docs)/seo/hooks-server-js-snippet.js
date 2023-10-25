export const handle = async ({ event, resolve }) => {
  //Determine the locale from the URL.
  //Implementing this is up to you, depending on your routing solution.
  const locale = getLocale(event);

  const response = await resolve(event, {
    //Replace the placeholder %lang% with the current locale.
    transformPageChunk({ html }) {
      html = html.replace("%lang%", locale);
      return html;
    },
  });

  return response;
};
