import { Rating } from '@mui/material';
import React, { useState } from 'react';

const New = () => {
    const [star, setStar] = useState(0);
    console.log('star', star);
    return (
        <div>
            <Rating
                name="simple-controlled"
                // name="half-rating"
                value={star}
                precision={0.5}
                onChange={(event, newValue) => {
                    setStar(newValue);
                }}
            />
        </div>
    );
};
export default New;
