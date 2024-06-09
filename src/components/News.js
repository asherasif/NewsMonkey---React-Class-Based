import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general",
  };

  s;

  constructor() {
    super();
    this.state = {
      articles: [],
      laoding: false,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f016322b02b4566b8bf160f821a8b86&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      laoding: true,
    });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseddata = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      laoding: false,
    });
    this.props.setProgress(90)
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    // console.log("next")
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f016322b02b4566b8bf160f821a8b86&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({
    //     laoding: true,
    //   })
    // let data = await fetch(url);
    // let parseddata = await data.json();
    // this.setState({
    //     page: this.state.page + 1,
    //     articles: parseddata.articles,
    //     laoding: false
    // });
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePrevClick = async () => {
    // console.log("Prev");
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f016322b02b4566b8bf160f821a8b86&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({
    //     laoding:true,
    //   })
    // let data = await fetch(url);
    // let parseddata = await data.json();
    // this.setState({
    //     page: this.state.page - 1,
    //     articles: parseddata.articles,
    //     laoding: false

    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f016322b02b4566b8bf160f821a8b86&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
  
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center my-4">
          NewsMonkey - {this.props.category} Top Headlines
        </h1>
        {this.state.laoding && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-5 ">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 " key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 50) : "-"}
                      desc={
                        element.description
                          ? element.description.slice(0, 100)
                          : "-"
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720"
                      }
                      newsUrl={element.url}
                      author={!element.author ? "Unknown" : element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between mb-2">
          <button
            type="button"
            disabled={this.state.page <= 1}
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
