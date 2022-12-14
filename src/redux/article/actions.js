import * as TYPES from '@/redux/types'
import axios from '@/utils/axios'

export const getTagList = () => dispatch =>
  axios.get('/tag/list').then(list => {
    const { data } = list
    dispatch({
      type: TYPES.ARTICLE_GET_TAG_LIST,
      payload: data
    })
  })

export const getCategoryList = () => dispatch =>
  axios.get('/category/list').then(list => {
    const { data } = list
    dispatch({
      type: TYPES.ARTICLE_GET_CATEGORY_LIST,
      payload: data
    })
  })
