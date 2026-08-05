import {
    Badge,
    Image,
    Stack,
    Text
} from "@chakra-ui/react";

export interface CompanyCardProps {
    name: string;
    icon_url: string;
    subtitle?: string;
    badge?: string;
}

export default function CompanyCard({
    name,
    icon_url,
    subtitle = '',
    badge = ''
}: CompanyCardProps) {
    return (
        <Stack align="center">
            <Image src={icon_url} boxSize={8} />
            <Text fontWeight="medium">
                {name}
            </Text>
            {badge && (
                <Badge>TypeScript</Badge>
            )}
            {subtitle && (
                <Text fontSize="sm">
                    {subtitle}
                </Text>
            )}
        </Stack>
    );
}