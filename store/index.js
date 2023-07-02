export const actions = {
  async getIncidents () {
    const response = await this.$axios.get('http://localhost:8000/api/bookmarks')
    return response.data
  }
}
