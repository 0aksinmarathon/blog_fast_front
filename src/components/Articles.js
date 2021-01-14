import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ArticleSummary from './ArticleSummary'

export default function Articles() {
    const [articles, setArticles] = useState();

    useEffect(async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/article/`);
        setArticles(res.data)
        return () => console.log('unmounting...');
    }, [])

    return (
        <div>
            {articles ? articles.map(article => (
                <ArticleSummary title={article.title} body={article.body} id={article.id} />
            )) : null
            }
        </div>
    );
}
