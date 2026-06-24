import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import Loader from "../../components/common/Loader";
import { setCredentials } from "../../store/slices/authSlice";
import type { Credentials, User } from "../../types/interface";

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();



    useEffect(() => {
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refreshToken');
        const fullName = searchParams.get('fullName');
        const profilePicture = searchParams.get('profilePicture');
        const userId = searchParams.get('userId');
        const email = searchParams.get('email');
        const createdAt = searchParams.get('createdAt');


        if (token && refreshToken && userId) {
            const user: User = {
                id: userId,
                email: email ?? "",
                fullName: fullName,
                avatarUrl: profilePicture,
                createdAt: createdAt ?? ""
            }
            const credentials: Credentials = {
                token: token,
                user: user,
                refreshToken: refreshToken
            }

            console.log(credentials);
            
            dispatch(setCredentials(credentials))
        }

    },
        [searchParams, dispatch])
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <Loader variant="pulse" size="lg" />
        </main>
    )
}

export default OAuthCallback