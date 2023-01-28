const filter = async (data, sortables, pageInfoModel) => {
    data.page = parseInt(data.page) || 1;
    data.limit = parseInt(data.limit) || 12;
    data.search = data.search || "";
    data.category = data.category || "";
    data.sortBy = (sortables.includes(data.sortBy) && data.sortBy) || "createdAt";
    data.sort = data.sort || "ASC";
  
    const params = {
      limit: data.limit,
      offset: (parseInt(data.page) - 1) * data.limit,
      search: data.search,
      sortBy: data.sortBy,
      sort: data.sort,
      category: data.category
    };
  
    const pageInfo = {
      page: data.page,
    };
  
    const totalData = await pageInfoModel(params);
    pageInfo.totalData = parseInt(totalData);
    pageInfo.totalPage = Math.ceil(totalData / data.limit);
    pageInfo.nextPage =
      data.page < pageInfo.totalPage ? pageInfo.page + 1 : null;
    pageInfo.prevPage = pageInfo.page > 1 ? data.page - 1 : null;
  
    return { params, pageInfo };
  };
  
  module.exports = filter;
  