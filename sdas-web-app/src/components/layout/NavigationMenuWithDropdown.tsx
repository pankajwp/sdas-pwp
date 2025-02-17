import * as React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export default function NavigationMenuWithDropdown() {
  return (
    <NavigationMenu className='z-20'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <BookOpen className='mr-2 h-5 w-5' />
            Administration
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='lg:grid-cols-full grid gap-1 p-3'>
              <ListItem to='/profile' title='Profile'></ListItem>
              <ListItem to='/docs/installation' title='Installation'></ListItem>
              <ListItem
                to='/docs/primitives/typography'
                title='Typography'
              ></ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link to='/profile'>
              <Home className='mr-2 h-5 w-5' />
              Profile{' '}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
