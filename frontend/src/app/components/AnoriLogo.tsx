export function AnoriLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="ANORI Jewellery and Accessories Store"
      className={`${className} object-contain`}
    />
  );
}
