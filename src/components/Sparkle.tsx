/**
 * Four-point sparkle drawn as SVG. The “✦” character is missing from some
 * Android and Windows fonts and then shows as an empty box (▯); a path never
 * does. Size follows the surrounding font size; colour follows currentColor.
 */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
      <path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5Z" fill="currentColor" />
    </svg>
  );
}
