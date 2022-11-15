import Image from "next/image";
import Link from "next/link";
import { BiSearch, BiShoppingBag, BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../app/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserIcon } from "@heroicons/react/20/solid";

export const Header = () => {
  const { data: session } = useSession();
  const items = useSelector(selectBasketItems);

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#e7ecee] p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image
              src="https://unsplash.com/random"
              fill
              className="object-fill"
              alt="Website Logo"
            />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a href="" className="headerLink">
          Product
        </a>
        <a href="" className="headerLink">
          Explore
        </a>
        <a href="" className="headerLink">
          Support
        </a>
        <a href="" className="headerLink">
          Business
        </a>
      </div>
      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        <BiSearch className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {items.length > 0 && (
              <span className="aboslute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                {items.length}
              </span>
            )}
            <BiShoppingBag className="headerIcon" />
          </div>
        </Link>
        {session ? (
          <Image
            src={
              session.user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="User Profile Image"
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={()=>signOut()}
            title={session.user ? 'Sign Out' : 'Login to see your profile...'}
          />
        ) : (
          <UserIcon className="headerIcon" onClick={()=> signIn} title="Sign in to buy"/>
        )}
      </div>
    </header>
  );
};
