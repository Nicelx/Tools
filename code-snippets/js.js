const checkSingle = () => {
  const regex = /^\/services\/.+/;
  return regex.test(window.location.pathname);
};
