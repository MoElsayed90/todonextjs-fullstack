import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="container flex items-center justify-between">
      <ModeToggle />
      <SignedOut>
        <span className="btn">
          <SignInButton />
        </span>
      </SignedOut>
      <SignedIn>
        <span className="btn">
          <UserButton />
        </span>
      </SignedIn>
    </div>
  )

}

export default Navbar;