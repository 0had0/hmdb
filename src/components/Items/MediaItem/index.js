import React from 'react';
import PropTypes from 'prop-types';

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

export function Item({
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
          data-testid="image"
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
            <CardTitle className="media-card-title" data-testid="name">
              {item?.title || item?.name || null}
            </CardTitle>
          </MediaOverlay>
        )}
      </MediaContainer>
      <CardContent className="media-card-content">
        {error ? (
          <RefreshSVGIcon data-testid="error" />
        ) : last ? (
          <>
            See More&nbsp;&nbsp;
            <ArrowForwardFontIcon data-testid="see-more" />
          </>
        ) : (
          <>
            <div className="stars" data-testid="rating">
              <StarFontIcon
                style={{
                  color: loading || !item?.vote_average ? '#616161' : '#FFEA00',
                }}
              />
              &nbsp;
              {item?.vote_average || (
                <Skeleton data-testid="skeleton-rating" width="5vmin" />
              )}
            </div>
            <i>
              {item?.release_date?.split('-')[0] ||
                item?.first_air_date?.split('-')[0] || (
                  <Skeleton width="5vmin" data-testid="skeleton-time" />
                )}
            </i>
          </>
        )}
      </CardContent>
    </Card>
  );
}

Item.propTypes = {
  item: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  handleClick: PropTypes.func,
  classNames: PropTypes.object,
  last: PropTypes.bool,
  goToFilterPage: PropTypes.func,
};

export default React.memo(Item);
