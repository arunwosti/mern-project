import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
    const {isAuthenticated, loginWithRedirect, user} = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500"/>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                {/* if the user is logged then it will show the email otherwise the custom text */}
                    {isAuthenticated ? (
                        <span className="flex items-center font-bold gap-2">
                            <CircleUserRound className="text-orange-500" />
                            {user?.email}
                        </span>
                    ) : (
                        <span> Welcome to MERN.ca!</span>
                    )
                    }
                 </SheetTitle>
                 <Separator />
                 <SheetDescription className="flex flex-col gap-4">
                    {/* if the user is logged then it will show nav links itherwise the button for login */}
                    {isAuthenticated ? (
                        <MobileNavLinks/>
                    ) :(
                        <Button 
                        onClick={()=> loginWithRedirect()} 
                        className="flex-1 font-bold bg-orange-500">Log In</Button>
                    ) }
                    
                 </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav;