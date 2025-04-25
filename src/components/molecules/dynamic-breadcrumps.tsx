import { useMatches } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/atoms/ui/breadcrumb";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const DynamicBreadcrumbs = () => {
  const matches = useMatches();

  const breadcrumbItems = matches
    .filter((match) => match.loaderData?.crumb)
    .map(({ pathname, loaderData }) => {
      return {
        href: pathname,
        label: loaderData?.crumb,
        icon: loaderData?.Logo ? loaderData.Logo : null,
      };
    });

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-2">
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.href}>
            <BreadcrumbItem className="text-sm font-medium flex items-center ">
              <BreadcrumbLink asChild>
                <Link to={item.href} className="flex items-center">
                  {item.icon && <item.icon />}
                  {item.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* Add separator between items, but not after the last item */}
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
