import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//  CREATING THE TYPE OF REQUEST
type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0(); // using predefined function to fetch the token using Auth0
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(user),
        });
        console.log("tresting responde: ", response)
        if(!response.ok){
            throw new Error("Failed to create user");
        }
    };

    const{
        mutateAsync: createUser, 
        isLoading, 
        isError, 
        isSuccess,
    } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    }
};

// -------- Creating hooks for updating the user datas in database -------

type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}
export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0 ();
   
    const updateMyUserRequest = async (formData: UpdateMyUserRequest ) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch (`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
       console.log("tresting responde: ", response)
        if(!response.ok) {
            throw new Error ("Failed to update user");
        }

        return response.json();
    };

    const { mutateAsync: updateUser, isLoading, isSuccess,  error, reset} = useMutation(updateMyUserRequest);

    if(isSuccess) {
        toast.success("User profile updated!");
    }

    if(error) {
        toast.error(error.toString());
        reset(); // it clears the error message
    }

    return {updateUser, isLoading};
};


// errors is showing in updateMyUserRequest;