import React, { ElementType, ReactNode } from "react";
type TypographyProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};
const Typography = ({
  as: Element,
  children,
  className = "",
}: TypographyProps) => {
  const ValidElement = Element as ElementType;
  return (
    <ValidElement className={`font-inter m-0 p-0 ${className}`}>
      {children}
    </ValidElement>
  );
};

// Extra Large headers (text-9xl)
export const Header9xlSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-9xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const Header9xlRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-9xl font-normal ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

// Large headers (text-8xl)
export const Header8xlSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-8xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const Header8xlRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-8xl font-normal ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

// Medium headers (text-7xl)
export const Header7xlSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-7xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const Header7xlRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-7xl font-normal ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

// Subheaders (text-6xl)
export const Header6xlSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-6xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const Header6xlRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-6xl font-normal ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

// Headers (text-5xl)
export const Header5xlSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-5xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const Header5xlRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h1"
    className={`text-5xl font-normal ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

// Headers (text-4xl)
export const Header4xlSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h2"
    className={`text-4xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const Header4xlRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h2"
    className={`text-4xl font-normal ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

// Headers (text-3xl)
export const Header3xlSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h3"
    className={`text-3xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const Header3xlRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h3"
    className={`text-3xl font-normal ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

// Subheaders (text-2xl)
export const Subheading2xlSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h4"
    className={`text-2xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const Subheading2xlRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="h4"
    className={`text-2xl font-normal ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

// Base text (text-xl)
export const TextXlSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="p"
    className={`text-xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const TextXlRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography as="p" className={`text-xl font-normal ${className}`} {...props}>
    {children}
  </Typography>
);

// Base text (text-lg)
export const TextLgSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="p"
    className={`text-lg font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const TextLgRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography as="p" className={`text-lg font-normal ${className}`} {...props}>
    {children}
  </Typography>
);

// Base text (text-base)
export const TextBaseSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="p"
    className={`text-base font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const TextBaseRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="p"
    className={`text-base font-normal ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

// Small text (text-sm)
export const TextSmallSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="p"
    className={`text-sm font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const TextSmallRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography as="p" className={`text-sm font-normal ${className}`} {...props}>
    {children}
  </Typography>
);

// Extra Small text (text-xs)
export const TextXSmallSemibold = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography
    as="p"
    className={`text-xs font-semibold ${className}`}
    {...props}
  >
    {children}
  </Typography>
);

export const TextXSmallRegular = ({
  children,
  className = "",
  ...props
}: TypographyProps) => (
  <Typography as="p" className={`text-xs font-normal ${className}`} {...props}>
    {children}
  </Typography>
);
