import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="314" rx="5" ry="5" width="280" height="88" />
    <rect x="0" y="421" rx="5" ry="5" width="90" height="27" />
    <rect x="0" y="272" rx="5" ry="5" width="280" height="28" />
    <circle cx="140" cy="130" r="130" />
    <rect x="129" y="415" rx="19" ry="19" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
