import { Button } from "@/components/atoms/ui/button";
import { Paragraph } from "@/components/atoms/ui/typography";
import { useCanGoBack, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, SaveIcon, Share2Icon } from "lucide-react";

interface TopbarProps {
  title: string;
  description?: string;
}

export default function WorkflowTopbar({ title, description }: TopbarProps) {
  const goBack = useCanGoBack();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 flex h-14 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex items-center justify-between px-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {goBack && (
            <Button
              variant="ghost"
              size="icon"
              tooltip="Go Back"
              className="h-8 w-8 transition-all hover:bg-secondary/80 shrink-0"
              onClick={() => navigate({ to: "/dashboard/workflows" })}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          <div className="space-y-0 min-w-0">
            <h1 className="text-base sm:text-lg font-semibold leading-none truncate">
              {title}
            </h1>
            {description && (
              <Paragraph className="hidden sm:block text-sm text-muted-foreground truncate">
                {description}
              </Paragraph>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 sm:w-auto px-2 sm:px-3 text-sm"
          >
            <SaveIcon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Save</span>
          </Button>

          <Button
            size="sm"
            className="h-8 w-8 sm:w-auto px-2 sm:px-3 text-sm bg-primary hover:bg-primary/90 transition-colors"
          >
            <Share2Icon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Publish</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
