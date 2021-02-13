// require('./src/styles/main.scss')


exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {

  if (location.hash) {
    return false;
  }

  return true;
};
