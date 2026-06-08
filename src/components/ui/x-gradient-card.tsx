import { VerifiedIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ReplyProps {
  authorName: string;
  authorHandle: string;
  authorImage: string;
  content: string;
  isVerified?: boolean;
  timestamp: string;
}

export interface PortfolioHighlightCardProps {
  link?: string;
  authorName: string;
  authorHandle: string;
  authorImage: string;
  content: string[];
  isVerified?: boolean;
  timestamp: string;
  reply?: ReplyProps;
}

export function PortfolioHighlightCard({
  link = "/about",
  authorName,
  authorHandle,
  authorImage,
  content,
  isVerified = true,
  timestamp,
  reply,
}: PortfolioHighlightCardProps) {
  const isExternal = link.startsWith("http");

  const card = (
    <div
      className={cn(
        "w-full min-w-0 md:min-w-[420px] max-w-xl p-1.5 rounded-2xl relative isolate overflow-hidden",
        "bg-white/5 dark:bg-black/40",
        "bg-gradient-to-br from-primary/5 to-accent/5",
        "backdrop-blur-xl backdrop-saturate-[180%]",
        "border border-border/60",
        "shadow-[0_8px_16px_rgb(0_0_0_/_0.12)]",
        "will-change-transform translate-z-0"
      )}
    >
      <div
        className={cn(
          "w-full p-5 rounded-xl relative",
          "bg-gradient-to-br from-background/80 to-transparent",
          "backdrop-blur-md border border-border/40",
          "text-foreground shadow-sm"
        )}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-primary/20">
              <img
                src={authorImage}
                alt={authorName}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-semibold text-foreground">{authorName}</span>
              {isVerified && <VerifiedIcon className="h-4 w-4 text-primary" />}
              <span className="text-muted-foreground text-sm">@{authorHandle}</span>
            </div>
            <span className="text-muted-foreground text-xs">{timestamp}</span>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          {content.map((item, index) => (
            <p key={index} className="text-foreground/90 text-sm leading-relaxed">
              {item}
            </p>
          ))}
        </div>

        {reply && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={reply.authorImage}
                  alt={reply.authorName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 flex-wrap text-xs">
                  <span className="font-semibold">{reply.authorName}</span>
                  {reply.isVerified && (
                    <VerifiedIcon className="h-3 w-3 text-primary" />
                  )}
                  <span className="text-muted-foreground">@{reply.authorHandle}</span>
                  <span className="text-muted-foreground">· {reply.timestamp}</span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">{reply.content}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {card}
      </a>
    );
  }

  return <Link to={link}>{card}</Link>;
}
