import React from "react"
import { graphql, Link } from "gatsby"
import { useState } from "react"
import { uniqueValuesOfArray } from "../utils"
import { Card, LabelCheckbox, Tag, Layout } from "../components"
import { navigate} from "@reach/router"

function FAQsIndex({data}) {
    const { allMarkdownRemark } = data
    const [searchTerm, setSearchTerm] = useState('')
    const [filterTags, setFilterTags] = useState([])
    const onChangeSelectTag = (e) => {
        setFilterTags([...(filterTags.filter(tag => tag !== e.target.value)), ...(e.target.checked ? [e.target.value] : [])])
    }
    return (
        <Layout>
            <div className="mb-8">
                <div className="d-flex">
                    <div className="mb-4 ml-4 mr-4" style={{minWidth: "15%"}}>
                        <div className="mb-8">
                            <input
                                className="input mb-8 mr-8"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{width: "85%"}}
                            />
                            <span className="cursor-pointer" onClick={() => setSearchTerm("")}>✖</span>
                        </div>
                        <div className="mb-8 t-center">Filter by tags</div>
                        <div className="d-flex" style={{flexWrap: "wrap"}}>
                            {allMarkdownRemark.edges
                                .map(({node: {frontmatter: {tags}}}) => ((console.log(tags) || true) && tags && tags.split(',')) || [])
                                .flat()
                                .filter((value, index, array) => array.indexOf(value) === index)
                                .sort()
                                .map(tag => 
                                    <div className="mr-4 mb-8 ml-4">
                                        <LabelCheckbox 
                                            label={tag}
                                            onChange={onChangeSelectTag}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="ml-4 mr-4">
                        <div className="d-flex mb-4" style={{justifyContent: 'space-between'}}>
                            {allMarkdownRemark.edges
                                .filter(({node: {frontmatter: {description, tags, title}}}) => [description, title, tags].some(k => k && k.toLowerCase().includes(searchTerm.toLowerCase())))
                                .filter(({node: {frontmatter: {tags}}}) => filterTags.length ? tags.split(',').some(tag => filterTags.includes(tag)) : true)
                                .map(({node: {frontmatter}}) => <Card className="mb-4 ml-4 mr-4" title={<Link to={frontmatter.slug}>{frontmatter.title}</Link>} description={frontmatter.description} tags={frontmatter.tags.split(',').map(tag => <Tag key={tag} tag={tag} />)} key={frontmatter.slug} onClick={() => {navigate(`${frontmatter.slug}/`)}}/>)
                            }
                        </div>
                    </div>
                </div>
                
                
            </div>
            
        </Layout>
    )
}

export default FAQsIndex

export const query = graphql`
    query FAQIndexQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }){
            edges {
                node {
                    frontmatter {
                        date
                        slug
                        title
                        description
                        tags
                    }
                }
            }
        }
    }
`
