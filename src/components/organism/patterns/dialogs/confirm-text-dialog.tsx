import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, type ReactNode, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogSectionSeparator,
  DialogTitle,
  DialogHeader,
  DialogSection,
  DialogDescription,
} from "@/components/atoms/ui/dialog";
import { FormControl } from "@/components/atoms/ui/form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/atoms/ui/input";
import { Button } from "@/components/atoms/ui/button";

export interface ConfirmTextDialogProps {
  loading: boolean;
  visible: boolean;
  title: string;
  size?: React.ComponentProps<typeof DialogContent>["size"];
  cancelLabel?: string;
  confirmLabel?: string;
  confirmPlaceholder: string;
  confirmString: string;
  text?: string | ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  blockDelete?: boolean;
  children?: ReactNode;
}

const ConfirmTextModal = forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof Dialog> & ConfirmTextDialogProps
>(
  (
    {
      title,
      onConfirm,
      onCancel,
      loading,
      cancelLabel = "Cancel",
      confirmLabel = "Confirm",
      confirmString,
      confirmPlaceholder,
      visible,
      blockDelete = false,
      text,
      children,
      size = "small",
      ...props
    },
    ref
  ) => {
    const formSchema = z.object({
      value: z.literal(confirmString, {
        required_error: `Please enter "${confirmString}" to confirm`,
      }),
    });

    type FormSchema = z.infer<typeof formSchema>;

    const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        value: "",
      },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
      onConfirm();
    }

    useEffect(() => {
      if (confirmString) form.reset();
    }, [confirmString]);

    return (
      <Dialog
        open={visible}
        {...props}
        onOpenChange={() => {
          if (visible) {
            onCancel();
          }
        }}
      >
        <DialogContent ref={ref} className="p-0 gap-0 pb-5 !block" size={size}>
          <DialogHeader className={cn("border-b")} padding="small">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {children && (
            <>
              <DialogSection padding="small">{children}</DialogSection>
              <DialogSectionSeparator />
            </>
          )}

          {typeof text !== "undefined" && (
            <>
              <DialogSection className="p-5" padding="small">
                <p className="text-sm text-muted-foreground">{text}</p>
              </DialogSection>
              <DialogSectionSeparator />
            </>
          )}

          <FormProvider {...form}>
            <form
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-5 flex flex-col gap-2 pt-3"
            >
              <Controller
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormControl
                    label={
                      <span className="text-sm">
                        Type{" "}
                        <span className="text-primary font-semibold break-all whitespace-pre">
                          {confirmString}
                        </span>{" "}
                        to confirm the deletion
                      </span>
                    }
                    isError={Boolean(form.formState.errors.value)}
                    errorText={form.formState.errors.value?.message}
                  >
                    <Input
                      {...field}
                      type="text"
                      placeholder={confirmPlaceholder}
                      disabled={loading}
                      className="w-full"
                      autoComplete="off"
                    />
                  </FormControl>
                )}
              />
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  type="submit"
                  loading={loading}
                  disabled={loading || form.formState.isSubmitting}
                  className="truncate w-full"
                >
                  {confirmLabel}
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    );
  }
);

export default ConfirmTextModal;

ConfirmTextModal.displayName = "ConfirmTextModal";
