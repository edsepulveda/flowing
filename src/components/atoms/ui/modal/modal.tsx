import React, { forwardRef, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogSectionSeparator,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../dialog";
import { cn } from "@/lib/utils";

export interface ModalProps extends React.ComponentProps<typeof DialogContent> {
  Separator?: React.ComponentType;
  Content?: React.ComponentType;
  visible?: boolean;
  description?: string;
  loading?: boolean;
  onCancel?: any;
  cancelText?: string;
  onConfirm?: any;
  confirmText?: string;
  showCloseButton?: boolean;
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  dialogOverlayProps?: React.ComponentProps<
    typeof DialogContent
  >["dialogOverlayProps"];
  trigger: React.ReactNode;
  headerText?: string;
  modal?: React.ComponentProps<typeof Dialog>["modal"];
  defaultOpen?: React.ComponentProps<typeof Dialog>["defaultOpen"];
  footerContent?: React.ReactNode;
  headerClassName?: string
}

interface ModalType
  extends React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof DialogContent> & ModalProps
  > {
  Content: React.ComponentType<{
    children?: React.ReactNode;
    className?: string;
  }>;
  Separator: React.ComponentType;
}

const Modal = forwardRef<
  React.ComponentRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent> & ModalProps
>(
  (
    {
      children,
      trigger,
      description,
      loading = false,
      cancelText = "Cancel",
      onCancel = () => {},
      onConfirm = () => {},
      confirmText = "Confirm",
      showCloseButton = true,
      size = "large",
      style,
      overlayStyle,
      contentStyle,
      headerText,
      modal,
      defaultOpen,
      footerContent,
      headerClassName,
      visible = false,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(visible ? visible : false);

    useEffect(() => {
      setOpen(visible);
    }, [visible]);

    function handleOpenChange(open: boolean) {
      if (visible !== undefined && !open) {
        onCancel();
      } else {
        setOpen(open);
      }
    }

    return (
      <Dialog
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        modal={modal}
      >
        {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
        <DialogContent
          ref={ref}
          hideClose={!showCloseButton}
          size={size}
          {...props}
        >
          {headerText || description ? (
            <DialogHeader className={cn("border-b border-neutral-300 dark:border-neutral-700 p-5")}>
              {headerText && <DialogTitle className={cn(headerClassName)}>{headerText}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          ) : null}
          {children}
          {footerContent && (
            <DialogFooter padding="small">{footerContent}</DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
) as ModalType;

const Content = forwardRef<
  React.ComponentRef<typeof DialogSection>,
  React.ComponentPropsWithoutRef<typeof DialogSection>
>(({ ...props }, ref) => {
  return <DialogSection ref={ref} {...props} padding="small" className={cn(props.className)} />
})

const Separator = forwardRef<
  React.ComponentRef<typeof DialogSectionSeparator>,
  React.ComponentPropsWithoutRef<typeof DialogSectionSeparator>
>(({ ...props }, ref) => {
  return <DialogSectionSeparator ref={ref} {...props} />
})

Modal.Content = Content
Modal.Separator = Separator
export default Modal