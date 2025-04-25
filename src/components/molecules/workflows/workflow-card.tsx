import {
  CalendarIcon,
  ChevronRight,
  ShuffleIcon,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/atoms/ui/button";
import { Card, CardContent } from "@/components/atoms/ui/card";
import { H3, Paragraph } from "@/components/atoms/ui/typography";
import { Badge } from "@/components/atoms/ui/badge";
import { useRouter } from "@tanstack/react-router";
import { DeleteWorkflowButton } from "@/components/organism/modals/workflows/delete-workflow";

interface CardWithActionsProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string | null;
  date: Date;
  isDraft?: boolean;
  onEdit: () => void;
}

export default function WorkflowCard({
  icon: Icon,
  title,
  id,
  description,
  date,
  isDraft = false,
  onEdit,
}: CardWithActionsProps) {
  const router = useRouter();

  return (
    <Card
      className="w-full overflow-hidden group hover:cursor-pointer hover:shadow-xl transition-shadow duration-150 ease-in-out flex flex-col"
      onClick={(e) => {
        e.stopPropagation();
        router.navigate({
          to: `/editor/$workflowId`,
          params: { workflowId: title }
        })
      }}
    >
      <CardContent className="flex flex-col h-full justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 p-3 shadow-inner transition-colors dark:from-gray-700 dark:via-gray-600 dark:to-gray-800">
            <div>
              <div className="text-gray-700 transition-colors dark:text-gray-200">
                <Icon className="size-5" />
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-x-4">
                <H3 size="xl" tracking="tight" className="mb-0 truncate">
                  {title}
                </H3>
                {isDraft && (
                  <Badge dotted variant="outline-primary" size="xs">
                    Draft
                  </Badge>
                )}
              </div>

              <span className="flex-shrink-0">
                <ChevronRight className="size-5 opacity-0 transition-all duration-150 group-hover:opacity-100" />
              </span>
            </div>
            {description && (
              <Paragraph
                size="xs"
                variant="secondary"
                className="line-clamp-2 overflow-hidden"
              >
                {description}
              </Paragraph>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
          <div className="flex items-center text-xs text-muted-foreground transition-colors">
            <CalendarIcon className="mr-1 h-3.5 w-3.5" />
            <time dateTime={date.toISOString()} className="font-mono">
              {date.toLocaleDateString()}
            </time>
          </div>

          <div className="flex flex-row gap-x-4">
            <Button
              variant="muted"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="z-10"
            >
              <ShuffleIcon className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>

            <DeleteWorkflowButton confirmName={title} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
