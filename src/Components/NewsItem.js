import React from 'react';

const NewsItem = (props) => {
  const { title, description, imageurl, newsurl, author, date, source } = props;

  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0',
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>

        <img
          src={imageurl}
          alt="news"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = process.env.PUBLIC_URL + '/images/defaultimage.png';
          }}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsurl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-success"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
