import { Flex } from "@chakra-ui/react";
import Link from "next/link";

interface HeaderContentProps {
  appName: string;
}

const HeaderContent = ({ appName }: HeaderContentProps): JSX.Element => (
  <Flex align="center" gap="4">
    <Link href="/" passHref aria-readonly className="font-bold text-2xl">
      {appName}
    </Link>
  </Flex>
);

export default HeaderContent;
