import Avatar from "~/components/ui/avatar";
import { SearchBar } from "~/components/ui/SearchBar";
import emailNameParse from "~/utils/emailNameParse";
import formatDate from "~/utils/dateFormat";
import { cn } from "~/utils/cn";
import type { ParsedEmail } from "./emailClient";

// Define styles using cn
const emailListItemStyles = (selected: boolean) =>
  cn("EmailListItem flex cursor-pointer gap-2 border-b border-g2 p-4 bg-n1", {
    "bg-p2/40": selected,
    "bg-n1 hover:bg-s12/40": !selected,
  });

interface EmailListProps {
  selectEmail: (email: ParsedEmail) => void;
  selectedEmailID?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  emailFilter: string;
  emails: ParsedEmail[];
}

export default function EmailList({
  selectEmail,
  searchQuery,
  setSearchQuery,
  selectedEmailID,
  emailFilter,
  emails,
}: EmailListProps) {
  const filteredEmails = emails;

  return (
    <div className="EmailList flex h-full w-[400px] flex-col border-r-4 bg-white">
      <div className="SearchBarContainer bg-g3 h-[72px]">
        <div className="p-4">
          <SearchBar
            className="SearchBar w-full"
            type="text"
            placeholder="Search, (CMD + R)..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
      </div>

      <div className="EmailListHeader border-g2 bg-g1 flex items-center justify-between border-b px-6 py-2">
        <p className="EmailFilter text-g3 text-xs capitalize">{`Viewing: ${emailFilter}`}</p>
        <p className="EmailCount text-g3 text-xs capitalize">{`${filteredEmails.length} Emails`}</p>
      </div>

      <ul className="Emails flex-1 overflow-y-auto">
        {filteredEmails.map((email) => {
          const { name, email: senderEmail } = emailNameParse(email.from ?? "");
          return (
            <li
              key={email.id}
              className={emailListItemStyles(selectedEmailID === email.id)}
              onClick={() => selectEmail(email)}
            >
              <Avatar
                className="h-9 w-9"
                fullName={name || senderEmail || ""}
              />
              <div className="EmailContentsContainer flex flex-col">
                <div className="EmailHeader flex justify-between space-x-3">
                  <div className="EmailHeaderLeft flex items-center space-x-3">
                    <div className="EmailHeaderContent flex flex-col">
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-g4 text-xs">{email.subject}</p>
                    </div>
                  </div>
                  <p className="text-g3 text-sm">{formatDate(email.date)}</p>
                </div>
                <p className="EmailPreview text-g3 mt-2 line-clamp-2 w-full text-xs">
                  {email.body.slice(0, 50)}
                  {email.body.length > 50 && "..."}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
