
export const getDiscordCode = () => {
  const url_string = window.location.href
  const url = new URL(url_string);

  return url.searchParams.get("code");
}
