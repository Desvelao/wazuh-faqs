import { useStaticQuery, graphql } from "gatsby"

export const useBasePath = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        pathPrefix
      }
    }
  `)
  return site.pathPrefix
}