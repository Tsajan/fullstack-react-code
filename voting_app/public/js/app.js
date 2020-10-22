class ProductList extends React.Component {
  //    we can remove the constructor definition if we are to use property initializers using arrow
  //    functions
  // constructor(props) {
  //   super(props);

  //   this.handleProductUpVote = this.handleProductUpVote.bind(this);

  //   this.state = {
  //     products: [],
  //   };
  // }

  //state can be easily redefined create an arry with name state
  state = {
    products: [],
  };

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  //original definition without using arrow function
  // handleProductUpVote(productId) {
  //   const nextProducts = this.state.products.map((product) => {
  //     if (product.id === productId) {
  //       return Object.assign({}, product, { votes: product.votes + 1 });
  //     } else {
  //       return product;
  //     }
  //   });
  //   this.setState({ products: nextProducts });
  // }

  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, { votes: product.votes + 1 });
      } else {
        return product;
      }
    });
    this.setState({ products: nextProducts });
  };

  render() {
    const products = this.state.products.sort((a, b) => b.votes - a.votes);
    const productComponents = this.state.products.map((product) => (
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));

    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  // the arrow function assignment of all custom function that receive props, will also make
  // constructor definition redundant
  // constructor(props) {
  //   super(props);
  //   // the arrow function assignment of handleUpVote, prevents the necessity
  //   // to bind the custom component function
  //   //this.handleUpVote = this.handleUpVote.bind(this);
  // }

  handleUpVote = () => {
    this.props.onVote(this.props.id);
  };

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by: </span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
