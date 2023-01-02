exports.paginate = (data, pageSize) => {
  const numPages = Math.ceil(data.length / pageSize);
  const pages = [];

  for (let i = 0; i < numPages; i++) {
    const start = i * pageSize;
    const end = start + pageSize;
    pages.push(data.slice(start, end));
  }

  return pages;
};
