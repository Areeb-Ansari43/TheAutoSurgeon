import { socials, type SocialId } from "@shared/catalog";

const paths: Record<SocialId | "whatsapp", string> = {
  facebook:
    "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z",
  instagram:
    "M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.3c-.1-1.5-.4-2.8-1.5-3.8S17.2 3.1 15.7 3c-1.5-.1-5.9-.1-7.4 0-1.5.1-2.8.4-3.8 1.5S3.1 6.8 3 8.3c-.1 1.5-.1 5.9 0 7.4.1 1.5.4 2.8 1.5 3.8s2.3 1.4 3.8 1.5c1.5.1 5.9.1 7.4 0 1.5-.1 2.8-.4 3.8-1.5s1.4-2.3 1.5-3.8c.1-1.5.1-5.9 0-7.4Zm-2 9.1a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.4s-.1-4.1.4-5.3a3 3 0 0 1 1.7-1.7C7.9 4.5 10.7 4.6 12 4.6s4.1-.1 5.3.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.2-.4 5.4Z",
  tiktok:
    "M16.6 3h-3.1v12.3a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.8 5.8 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-4.3-4.4Z",
  whatsapp:
    "M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Zm0 16a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.7.7.7-2.6-.2-.3A7.2 7.2 0 1 1 12 19.2Zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-2.9-2.6c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.6-.4Z",
};

export function SocialIcon({
  id,
  size = 18,
}: {
  id: SocialId | "whatsapp";
  size?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path fill="currentColor" d={paths[id]} />
    </svg>
  );
}

/** Row of round social icon links. `rel="me"` tells search engines these profiles are ours. */
export function SocialLinks({ className = "social-icons" }: { className?: string }) {
  return (
    <div className={className}>
      {socials.map(social => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="me noopener noreferrer"
          className={`social-icon social-icon-${social.id}`}
          aria-label={`The Auto Surgeon on ${social.name} (${social.handle})`}
          title={`${social.name} · ${social.handle}`}
        >
          <SocialIcon id={social.id} />
        </a>
      ))}
    </div>
  );
}
