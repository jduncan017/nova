// this function is used to parse the name and email from the from field of an email
export default function emailNameParse(fromField: string) {
  const regex = /^(?:"?([^"<]+)"?\s*)?([^@\s]+@[^@\s]+)>?$/;
  const match = regex.exec(fromField.trim());

  //  generates initials for the avatar
  function generateInitials(name: string): string {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  // generates intiials from the email if the name isn't present.
  function generateEmailInitials(email: string): string {
    return email.slice(0, 2).toUpperCase();
  }

  if (match) {
    const name = match[1];
    const email = match[2];
    const parsedName = name ? name.trim() : "";
    const parsedEmail = email ? email.trim() : "";
    const initials = parsedName
      ? generateInitials(parsedName)
      : parsedEmail
        ? generateEmailInitials(parsedEmail)
        : "??";

    return {
      name: parsedName,
      email: parsedEmail,
      initials: initials,
    };
  }

  // If the regex doesn't match, assume it's just an email
  const email = fromField.trim();
  return {
    name: "",
    email: email,
    initials: email ? generateEmailInitials(email) : "??",
  };
}
