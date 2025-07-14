/**
 * Utility function để build response với message tùy chỉnh
 * Được sử dụng trong controller để tạo response chuẩn
 */
export function buildResponse<T>(data: T, message?: string) {
  return {
    responseData: data,
    message: message || 'Thành công',
  };
}

/**
 * Helper functions cho các response phổ biến
 */
export const ResponseHelper = {
  /**
   * Success response với data
   */
  success: <T>(data: T, message?: string) => buildResponse(data, message),

  /**
   * Success response cho create operations
   */
  created: <T>(data: T, message?: string) =>
    buildResponse(data, message || 'Tạo thành công'),

  /**
   * Success response cho update operations
   */
  updated: <T>(data: T, message?: string) =>
    buildResponse(data, message || 'Cập nhật thành công'),

  /**
   * Success response cho delete operations
   */
  deleted: <T>(data: T, message?: string) =>
    buildResponse(data, message || 'Xóa thành công'),

  /**
   * Success response cho list operations
   */
  list: <T>(data: T, message?: string) =>
    buildResponse(data, message || 'Lấy danh sách thành công'),

  /**
   * Success response cho detail operations
   */
  detail: <T>(data: T, message?: string) =>
    buildResponse(data, message || 'Lấy thông tin thành công'),
};
