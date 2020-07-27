import React from 'react';
import { Text } from 'react-md';
import src from 'images/breackingBad3.jpg';

import HorizontalFetchList from 'components/HorizontalFetchList';
import Footer from 'components/Footer';

import './DiscoveryView.css';

export default () => {
  return (
    <>
      <header className="discovery-view-header">
        <Text type="headline-2" className="discovery-view-cover-title">
          The Second Best Resource for Movies and Series !
        </Text>
      </header>
      <div className="discovery-view-outer-img">
        <img
          src={src}
          alt="Breacking Bad"
          width="100%"
          height="auto"
          style={{ opacity: 0.6 }}
        />
      </div>

      <HorizontalFetchList
        label="What's Popular"
        href="/movies?key=popular"
        stateKey="popular_movies"
      />
      <HorizontalFetchList
        label="Trending Movies"
        href="/series?key=trending"
        stateKey="trending_movies"
      />
      <HorizontalFetchList
        label="Popular Movies"
        href="/movies?key=popular"
        stateKey="popular_series"
      />
      <HorizontalFetchList
        label="Top Series"
        href="/series?key=trending"
        stateKey="trending_series"
      />
      <Footer />
    </>
  );
};
