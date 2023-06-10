'use client';

import Search from '@components/Search';
import React from 'react';

const ClientProtectedPage = () => {
    const { data: session } = useSession({
        required: true,
    });
};

const page = () => {
    return (
        <div className='flex-center'>
            <Search />
        </div>
    );
};

export default page;