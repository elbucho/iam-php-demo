import {
    Badge,
    Image,
    Stack,
    Text
} from "@chakra-ui/react";

export interface CompanyCardProps {
    name: string;
    iconPath: string;
    subtitle?: string;
    badge?: string;
    badgeColor?: string;
}

export default function CompanyCard({
    name,
    iconPath,
    subtitle = '',
    badge = '',
    badgeColor = 'default'
}: CompanyCardProps) {
    return (
        <Stack align="center" gap={0}>
            <Image src={iconPath} boxSize={8} />
            <Text fontWeight="medium">
                {name}
            </Text>
            {badge && (
                <Badge fontSize="xs" colorPalette={badgeColor}>{badge}</Badge>
            )}
            {subtitle && (
                <Text fontSize="sm" fontStyle="italic">
                    {subtitle}
                </Text>
            )}
        </Stack>
    );
}