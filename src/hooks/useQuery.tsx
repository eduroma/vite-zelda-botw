import { useLocation } from 'react-router-dom'

const useQuery = (): { [key: string]: string } => {
  const searchParams = new URLSearchParams(useLocation().search)

  const queryParams = {}

  // eslint-disable-next-line no-restricted-syntax
  for (const param of searchParams.entries()) {
    Object.assign(queryParams, { [param[0]]: param[1] })
  }

  return queryParams
}

export default useQuery
