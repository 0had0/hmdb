import React from 'react';
import { Card, MediaContainer, CardTitle, MediaOverlay } from 'react-md';

import SekeletonBackground from '../../../images/skeleton.jpg';

import './CastItem.css';

function CastItem({ item, loading, error, handleClick }) {
  const [loaded, setLoaded] = React.useState(false);
  if (!item?.profile_path || !item?.name) {
    return null;
  }
  return (
    <Card className="cast-item-root">
      <MediaContainer fullWidth>
        <img
          style={loaded ? {} : { visbility: 'none' }}
          src={
            item?.profile_path
              ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
              : SekeletonBackground
          }
          alt={item?.id}
          onLoad={() => setLoaded(true)}
        />
        {loaded && (
          <MediaOverlay>
            <CardTitle className="cast-item-title">
              {item?.name ?? null}
            </CardTitle>
          </MediaOverlay>
        )}
      </MediaContainer>
    </Card>
  );
}

export default CastItem;
