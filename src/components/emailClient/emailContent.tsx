import React from "react";
import type { ParsedEmail } from "./emailClient";
import emailNameParse from "~/utils/emailNameParse";
import Avatar from "~/components/ui/avatar";
import formatDate from "~/utils/dateFormat";
import DOMPurify from "dompurify";

type EmailContentProps = {
  email: ParsedEmail;
};

export default function EmailContent({ email }: EmailContentProps) {
  const { from, body, date } = email;

  const formattedDate = formatDate(date);
  const { name: senderName, email: senderEmail } = emailNameParse(from);

  return (
    <div className="ContentWindow border-g3 bg-n1 m-6 flex h-full flex-col rounded-lg p-6">
      <div className="HeaderSection mb-6">
        <div className="EmailHeader flex items-start justify-between gap-2">
          <div className="From/To flex gap-2 leading-none">
            <Avatar className="h-10 w-10" fullName={from} />
            <div className="EmailFrom flex flex-col items-start">
              <div className="SenderNameContainer flex gap-2">
                <p className="SenderName text-lg leading-none font-semibold">
                  {senderName && `${senderName}`}
                </p>
              </div>
              <p className="SenderEmail text-g3 text-sm">{senderEmail}</p>
            </div>
          </div>
          <p className="Date text-g3 text-sm">{formattedDate}</p>
        </div>
      </div>
      <div
        className="EmailBody overflow-y-auto px-4 pb-20 text-wrap"
        style={{
          lineHeight: "1.6",
          fontSize: "1rem",
        }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(body, {
            ALLOWED_TAGS: [
              "a",
              "b",
              "i",
              "u",
              "em",
              "strong",
              "p",
              "br",
              "div",
              "span",
              "ul",
              "ol",
              "li",
              "img",
            ],
            ALLOWED_ATTR: [
              "href",
              "src",
              "alt",
              "title",
              "width",
              "height",
              "style",
            ],
          }),
        }}
      />
    </div>
  );
}
