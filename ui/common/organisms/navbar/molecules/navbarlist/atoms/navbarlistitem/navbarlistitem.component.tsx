import Link from 'next/link';

const NavbarListItem = ({ name, href }: NavbarListItemProps) => (
    <li>
        <Link href={href}>
            <a style={{ color: 'var(--light-text-color)' }}>
                {name}
            </a>
        </Link>
    </li>
)

type NavbarListItemProps = {
    name: string;
    href: string;
}

export default NavbarListItem;