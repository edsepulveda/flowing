import { useMatches } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
} from "@/components/atoms/ui/breadcrumb";

export const DynamicBreadcrumbs = () => {
  const matches = useMatches();

  const breadcrumbItems = matches
    .filter((match) => match.loaderData?.crumb)
    .map(({ pathname, loaderData }) => ({
      href: pathname,
      label: loaderData?.crumb,
    }));

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex gap-2">
        {breadcrumbItems.map((item) => (
          <BreadcrumbItem key={item.href} className="text-base font-medium">
            {item.label}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
