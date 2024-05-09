import { AuthInfo } from '@/config/interfaces'
import {
  LOCAL_STRAGE_USER_NAME_KEY,
  LOCAL_STRAGE_AUTH_TOKEN_KEY,
} from '@/config/setting'

const useLocalStrage = () => {
  /**
   * LocalStrageへJWTとユーザー名を保存する
   * @param jwt string
   * @param userName string
   */
  const setAuthInfoToLocalStrage = (jwt: string, userName: string) => {
    // ユーザー名とjwtをローカルストレージに保存
    localStorage.setItem(LOCAL_STRAGE_USER_NAME_KEY, userName)
    localStorage.setItem(LOCAL_STRAGE_AUTH_TOKEN_KEY, jwt)
  }

  /**
   * LocalStrageからJWTとユーザー名を削除する
   */
  const deleteAuthInfoFromLocalStrage = () => {
    localStorage.removeItem(LOCAL_STRAGE_USER_NAME_KEY)
    localStorage.removeItem(LOCAL_STRAGE_AUTH_TOKEN_KEY)
  }

  /**
   * LocalStrageからJWTとユーザー名を取得する
   * @returns AuthInfo
   */
  const getAutuInfo = () => {
    let authInfo: AuthInfo = { jwt: null, userName: null }
    authInfo.userName = localStorage.getItem(LOCAL_STRAGE_USER_NAME_KEY)
    authInfo.jwt = localStorage.getItem(LOCAL_STRAGE_AUTH_TOKEN_KEY)

    return authInfo
  }

  return {
    setAuthInfoToLocalStrage,
    deleteAuthInfoFromLocalStrage,
    getAutuInfo,
  }
}

export default useLocalStrage
