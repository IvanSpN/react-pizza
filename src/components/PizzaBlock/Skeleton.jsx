import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="89" cy="89" r="89" />
    <circle cx="112" cy="126" r="20" />
    <rect x="0" y="209" rx="10" ry="10" width="187" height="32" />
    <rect x="0" y="265" rx="10" ry="10" width="280" height="88" />
    <rect x="142" y="380" rx="10" ry="10" width="137" height="40" />
    <rect x="11" y="381" rx="10" ry="10" width="95" height="30" />
  </ContentLoader>
);

export default Skeleton;
