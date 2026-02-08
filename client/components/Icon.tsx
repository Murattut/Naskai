import Image from "next/image";

export type IconName =
    | "sun"
    | "moon"
    | "menu"
    | "close"
    | "lightbulb"
    | "clipboard"
    | "magic"
    | "check"
    | "github"
    | "linkedin"
    | "twitter"
    | "arrow-down";

interface IconProps {
    name: IconName;
    size?: number;
    className?: string;
}

export function Icon({ name, size = 24, className = "" }: IconProps) {
    return (
        <Image
            src={`/icons/${name}.svg`}
            alt={name}
            width={size}
            height={size}
            className={className}
            style={{ width: size, height: size }}
        />
    );
}
