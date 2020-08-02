import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Avatar,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardSubtitle,
  Button,
} from 'react-md';

import './Reviews.css';

function Reviews({ id, list }) {
  const [first, ...rest] = list;
  const [all, setShowAll] = useState(false);

  const _toggle_reviews = () => setShowAll(!all);

  if (list.length === 0 || !list) {
    return <Text type="body-2">No reviews</Text>;
  }

  const renderAll = () =>
    rest?.map((item) => (
      <Card key={item?.id} bordered className="review-root">
        <CardHeader beforeChildren={<Avatar>A</Avatar>}>
          <CardTitle>{item?.author}</CardTitle>
          <CardSubtitle>
            <a style={{ color: '#fff' }} href={item?.url}>
              Visit Profile
            </a>
          </CardSubtitle>
        </CardHeader>
        <CardContent>
          <Text>{item?.content}</Text>
        </CardContent>
      </Card>
    ));

  return (
    <>
      <Card key={first?.id} bordered className="review-root">
        <CardHeader beforeChildren={<Avatar>A</Avatar>}>
          <CardTitle>{first?.author}</CardTitle>
          <CardSubtitle>
            <a style={{ color: '#fff' }} href={first?.url}>
              Visit Profile
            </a>
          </CardSubtitle>
        </CardHeader>
        <CardContent>
          <Text>{first?.content}</Text>
        </CardContent>
      </Card>
      {all && renderAll()}
      {rest.length !== 0 && (
        <Button onClick={_toggle_reviews}>{!all ? 'Show More' : 'Less'}</Button>
      )}
    </>
  );
}

Reviews.propTypes = {
  id: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};

export default React.memo(Reviews);
