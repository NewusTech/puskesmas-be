class Pagination {
  constructor (page, size, baseUrl) {
    this.page = page || 0
    this.limit = size || 3
    this.offset = this.page !== 0 ? this.page * this.limit : 0
    this.baseUrl = baseUrl
  }

  data (count, data) {
    return {
      total_item: count,
      page: this.page,
      item: data,
      total_pages: Math.ceil(count / this.limit),
      links: {
        prev: this.page > 1 ? `${this.baseUrl}?page=${this.page - 1}&limit=${this.limit}` : null,
        next: this.page + 1 < Math.ceil(count / this.limit) ? `${this.baseUrl}?page=${this.page + 1}&limit=${this.limit}` : null
      }
    }
  }
}

module.exports = Pagination
