import React from 'react';
import {
  Card,
  MediaContainer,
  MediaOverlay,
  CardTitle,
  CardContent,
  StarFontIcon,
  RefreshSVGIcon,
  ArrowForwardFontIcon,
} from 'react-md';

import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import SekeletonBackground from '../../../images/skeleton.jpg';

import './MediaItem.css';

function Item({
  item,
  loading,
  error,
  handleClick,
  classNames,
  last,
  goToFilterPage,
}) {
  const history = useHistory();
  const [loaded, setLoaded] = React.useState(false);
  const goToTheOverViewPage = () =>
    item
      ? history.push(`/${item.name ? 'tv' : 'movie'}/${item.id}`)
      : !loading && error
      ? handleClick()
      : last && goToFilterPage();
  return (
    <Card
      className={`media-card ${classNames}`}
      style={(loading || last) && { backgroundColor: '#212121' }}
      onClick={goToTheOverViewPage}>
      <MediaContainer fullWidth>
        <img
          style={loaded ? {} : { visbility: 'none' }}
          src={
            !item?.poster_path
              ? SekeletonBackground
              : `https://image.tmdb.org/t/p/w185${item.poster_path}`
          }
          onLoad={() => setLoaded(true)}
          alt={item?.id}
        />
        {loaded && !loading && !error && !last && (
          <MediaOverlay>
            <CardTitle className="media-card-title">
              {item?.title || item?.name || null}
            </CardTitle>
          </MediaOverlay>
        )}
      </MediaContainer>
      <CardContent className="media-card-content">
        {error ? (
          <RefreshSVGIcon />
        ) : last ? (
          <>
            See More&nbsp;&nbsp;
            <ArrowForwardFontIcon />
          </>
        ) : (
          <>
            <div className="stars">
              <StarFontIcon
                style={{
                  color: loading || !item?.vote_average ? '#616161' : '#FFEA00',
                }}
              />
              &nbsp;
              {item?.vote_average || <Skeleton width="5vmin" />}
            </div>
            <i>
              {item?.release_date?.split('-')[0] ||
                item?.first_air_date?.split('-')[0] || (
                  <Skeleton width="5vmin" />
                )}
            </i>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default React.memo(Item);
