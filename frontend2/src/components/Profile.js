import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user } = useAuth0();

    return (
        <div class="text-right">
            <p>Welcome <b>{user.nickname}</b></p>
        </div>
    )
}

export default Profile