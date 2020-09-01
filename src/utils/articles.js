import { useQuery, queryCache } from 'react-query'
import { useClient } from '@context/auth'
import logoPlaceholder from '@public/assets/logo.svg'

const skeletonFormat = {
  title: 'Laden...',
  subtitle: 'Laden...',
  article_image: [{ url: logoPlaceholder }],
  loadingArticle: true,
}

const skeletonData = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-article-${index}`,
  ...skeletonFormat,
}))

const articleQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

const getArticlesConfig = (client) => ({
  queryKey: 'articles',
  queryFn: () => client('articles').then((res) => res),
  config: {
    onSuccess(articles) {
      for (const article of articles) {
        queryCache.setQueryData(
          ['article', { articleId: article.id }],
          article,
          articleQueryConfig
        )
      }
    },
  },
})

function useArticlesFetch() {
  const client = useClient()
  const result = useQuery(getArticlesConfig(client))

  return { ...result, articles: result.data ?? skeletonData }
}

function setQueryDataForArticle(article) {
  queryCache.setQueryData({
    queryKey: ['article', { articleId: article.id }],
    queryFn: article,
    ...articleQueryConfig,
  })
}

export { useArticlesFetch, setQueryDataForArticle }
