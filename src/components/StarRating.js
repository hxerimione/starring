import { Rating } from '@mui/material';
import React from 'react';

const StarRating = ({ star, onChange, readOnly }) => {
    return readOnly ? (
        <Rating
            className="star"
            size="small"
            precision={0.5}
            value={star}
            readOnly
        />
    ) : (
        <Rating
            className="star"
            value={Number(star)}
            defaultValue={0.0}
            precision={0.5}
            onChange={onChange}
        />
    );
};
export default React.memo(StarRating);
