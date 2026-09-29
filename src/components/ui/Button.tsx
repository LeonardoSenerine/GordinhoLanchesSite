import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "light" | "outline" | "dark";
type Size = "md" | "lg";

const base =
  "btn-shine inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wider disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand-red text-cream shadow-[0_10px_30px_-10px] shadow-brand-red/70 hover:bg-brand-red-dark",
  light: "bg-cream text-charcoal hover:bg-white",
  dark: "bg-charcoal text-cream hover:bg-ink-2",
  outline: "border-2 border-current text-current hover:bg-current/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-xs",
  lg: "h-14 px-8 text-sm",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

export function buttonClasses({ variant = "primary", size = "md" }: StyleProps = {}, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, ...props }: ComponentProps<"button"> & StyleProps) {
  return <button className={buttonClasses({ variant, size }, className)} {...props} />;
}

/** Botão com aparência de link. Links externos abrem em nova aba automaticamente. */
export function ButtonLink({
  variant,
  size,
  className,
  href,
  ...props
}: ComponentProps<typeof Link> & StyleProps & { href: string }) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className={buttonClasses({ variant, size }, className)}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    />
  );
}
