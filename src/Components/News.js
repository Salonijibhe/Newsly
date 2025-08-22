import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News= (props)=>{
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


 const updateNews= async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
 }

 useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - Newsly`;
    updateNews();
 }, []);
  


  const fetchMoreData = async () => {
    setpage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles || []));
    settotalResults( parsedData.totalResults);
    
  };

 
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '30px 0px' , marginTop:'90px'  }}>
          Newsly - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>

        <InfiniteScroll
          dataLength={articles?.length || 0} // ✅ avoid crash
          next={fetchMoreData}
          hasMore={articles?.length !==totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles?.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ''}
                    description={element.description ? element.description : ''}
                    imageurl={element.urlToImage || process.env.PUBLIC_URL + '/images/defaultimage.png'}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source?.name || 'Unknown'} // ✅ safe access
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  
}

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
export default News;
