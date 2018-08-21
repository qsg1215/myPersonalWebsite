import { getCookie} from '@/utils/auth'

const getters = {
  sidebarStatus: state => state.app.sidebar.opened,
  brand: state => state.app.brand,
  qiniuToken: state => state.user.qiniuToken,
  userInfo: state => state.user.userInfo,
  limit: state => state.commonConfig.limit,
  pageSizeArr: state => state.commonConfig.pageSizeArr
}
export default getters
