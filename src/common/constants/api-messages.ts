/**
 * Enum chứa tất cả các message chuẩn được sử dụng trong API
 * Giúp đồng bộ và dễ dàng thay đổi message ở một nơi
 */
export enum ApiMessage {
  // General messages
  SUCCESS = 'Thành công',
  FAILED = 'Thất bại',
  NOT_FOUND = 'Không tìm thấy dữ liệu',
  INVALID_DATA = 'Dữ liệu không hợp lệ',
  UNAUTHORIZED = 'Không có quyền truy cập',
  FORBIDDEN = 'Bị cấm truy cập',
  INTERNAL_ERROR = 'Lỗi hệ thống',

  // User messages
  USER_CREATED = 'Tạo người dùng thành công',
  USER_UPDATED = 'Cập nhật người dùng thành công',
  USER_DELETED = 'Xóa người dùng thành công',
  USER_NOT_FOUND = 'Không tìm thấy người dùng',
  USER_LIST_SUCCESS = 'Lấy danh sách người dùng thành công',
  USER_DETAIL_SUCCESS = 'Lấy thông tin người dùng thành công',
  EMAIL_ALREADY_EXISTS = 'Email đã tồn tại',
  USER_INVALID_CREDENTIALS = 'Thông tin đăng nhập không chính xác',

  // Auth messages
  LOGIN_SUCCESS = 'Đăng nhập thành công',
  LOGIN_FAILED = 'Đăng nhập thất bại',
  LOGOUT_SUCCESS = 'Đăng xuất thành công',
  REGISTER_SUCCESS = 'Đăng ký thành công',
  REGISTER_FAILED = 'Đăng ký thất bại',
  TOKEN_INVALID = 'Token không hợp lệ',
  TOKEN_EXPIRED = 'Token đã hết hạn',
  ACCESS_DENIED = 'Quyền truy cập bị từ chối',

  // Product messages (for future use)
  PRODUCT_CREATED = 'Tạo sản phẩm thành công',
  PRODUCT_UPDATED = 'Cập nhật sản phẩm thành công',
  PRODUCT_DELETED = 'Xóa sản phẩm thành công',
  PRODUCT_NOT_FOUND = 'Không tìm thấy sản phẩm',
  PRODUCT_LIST_SUCCESS = 'Lấy danh sách sản phẩm thành công',

  // Order messages (for future use)
  ORDER_CREATED = 'Tạo đơn hàng thành công',
  ORDER_UPDATED = 'Cập nhật đơn hàng thành công',
  ORDER_DELETED = 'Xóa đơn hàng thành công',
  ORDER_NOT_FOUND = 'Không tìm thấy đơn hàng',
  ORDER_PLACED = 'Đặt đơn hàng thành công',
  ORDER_CANCELLED = 'Hủy đơn hàng thành công',
}
