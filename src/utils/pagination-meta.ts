export const paginationMeta = (skip: number, limit: number, total: number) => {
  return {
    total,
    per_page: limit,
    current_page: Math.floor(skip / limit) + 1,
    total_pages: Math.ceil(total / limit),
  };
};
