'use client';

import Search from '@components/Search';
import Widget from '@components/widget';
import React from 'react';

const ClientProtectedPage = () => {
    const { data: session } = useSession({
        required: true,
    });
};

const page = () => {
    return (
        <div className='flex-col'>
            <div className='top'>
                <div className='flex gap-4'>
                    <Widget type='wishlist' />
                    <Widget type='borrowed' />
                </div>
            </div>
            <hr />
            <br />
            <div className="botton flex-center">
                <Search />
            </div>
        </div>
    );
};

export default page;