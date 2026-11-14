type BrandMarkProps = {
  className?: string;
};

/** Shared EventHive mark for public navigation, footer, and dashboards.
 * Public microsites retain their organiser-specific branding.
 */
export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16 2L28.6 9.1V23L16 30L3.4 23V9.1L16 2Z" fill="#14133A" />
      <path d="M16 8.4L22.8 12.2V19.8L16 23.6L9.2 19.8V12.2L16 8.4Z" fill="#FFC233" />
      <circle cx="16" cy="16" r="2.6" fill="#5B4BFF" />
    </svg>
  );
}
