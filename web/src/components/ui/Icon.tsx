import type { SVGProps } from "react";

const PATHS = {
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  balance: ["M12 4v16", "M7 20h10", "M5 8h14", "M5 8l-2.5 6h5z", "M19 8l-2.5 6h5z"],
  chat: ["M5 5h14v10H10l-4 3.5V15H5z"],
  check: ["M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z", "M8.5 12.2l2.4 2.4 4.8-5"],
  people: [
    "M9 4.8a3.2 3.2 0 1 0 0 6.4a3.2 3.2 0 1 0 0-6.4z",
    "M3.5 19c.8-3 3-4.6 5.5-4.6s4.7 1.6 5.5 4.6",
    "M16 5.2a3 3 0 0 1 0 5.6",
    "M17.5 14.6c1.6.5 2.7 2 3 4.4",
  ],
  document: ["M7 3h7l4 4v14H7z", "M14 3v4h4", "M9.5 12h6", "M9.5 15.5h6"],
  bell: ["M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z", "M10 20.5a2 2 0 0 0 4 0"],
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: "0 0 auto" }}
      {...rest}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
