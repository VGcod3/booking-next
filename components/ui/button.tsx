import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "border border-transparent font-medium inline-flex items-center justify-center rounded font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600",
        destructive:
          "bg-rose-600 text-destructive-foreground hover:bg-rose-700 focus:ring-rose-600",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground focus:ring-gray-400",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-gray-400",
        ghost: "hover:bg-gray-200 hover:text-accent-foreground focus:ring-gray-400",
        link: "underline-offset-4 hover:underline text-primary focus:ring-gray-400",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        default: "px-8 py-3",
        lg: "px-10-6 py-4 text-lg rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
