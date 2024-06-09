import React, { Component } from "react";

export default class NewsItems extends Component {
  render() {
    let { title, desc, imageUrl, newsUrl, author, publishedAt, source } = this.props;
    return (
      <div className="my-3">
        <div class="card" style={{}}>
          <div className="container" style={{display:'flex', justifyContent:'flex-end',left:'10px',position:'absolute'
          }}>
          <span class="badge rounded-pill bg-danger">
            {source}
          </span>
          </div>
          <img src={imageUrl} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{title}...</h5>
            <p class="card-text">{desc}...</p>
            <p class="card-text">
              <small class="text-body-secondary">
                By {author} at {new Date(publishedAt).toDateString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              class="btn btn-sm btn-primary btn-dark text-center"
              rel="noferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
