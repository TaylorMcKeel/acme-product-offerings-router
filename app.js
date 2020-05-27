const root = document.querySelector("#root");

const { Component } = React;
const { render } = ReactDOM;
const { HashRouter, Rpute, Link, Switch, Redirect } = ReactRouterDOM;

const products = axios.get();
const companies = axios.get();
const offerings = axios.get();

class Nav extends Component {
  render() {
    const { products, companies, offerings } = this.props;
    const links = [
      { to: "companies", text: `Companies (${companies.length})` },
      { to: "products", text: `Products (${products.length})` },
    ];
    return (
      <nav>
        <h1 id="title">Acme Offerings React</h1>
        <div>
          {links.map((link, idx) => (
            <Link
              className={path.slice(1) === link.to ? "selected" : ""}
              key={idx}
              to={link.to}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </nav>
    );
  }
}

class Products extends Component {
  render() {
    const { products, companies, offerings } = this.props;
    return products.map((prod) => {
      return (
        <li key={prod.id}>
          <h2>{prod.name}</h2>
          <div>{prod.description}</div>
          <h3>{prod.suggestedPrice}</h3>
          <ul>
            {offerings
              .filter((offer) => {
                offer.productId === prod.id;
              })
              .map((offering) => {
                companies
                  .find((comp) => {
                    comp.id === offering.companyId;
                  })
                  .map((company) => {
                    return <li>{company.name}</li>;
                  });
              })}
          </ul>
        </li>
      );
    });
  }
}

class Companies extends Component {
  render() {
    const { products, companies, offerings } = this.props;
    return companies.map((comp) => {
      return (
        <li key={comp.id}>
          <h2>{comp.name}</h2>
          <div>{comp.catchPhrase}</div>
          Offering:
          <ul>
            {offerings
              .filter((offer) => {
                offer.companyId === comp.id;
              })
              .map((offering) => {
                products
                  .find((prod) => {
                    prod.id === offering.productId;
                  })
                  .map((product) => {
                    return (
                      <li>
                        {product.name} {offering.price}
                      </li>
                    );
                  });
              })}
          </ul>
        </li>
      );
    });
  }
}

class App extends Component {
  state = {
    products: [],
    companies: [],
    offerings: [],
  };

  componentDidMount() {
    Promise.all([products, companies, offerings]).then((res) => {
      this.setState({
        products: res[0].data,
        companies: res[1].data,
        offerings: res[2].data,
      });
    });
  }

  render() {
    const { companies, products, offerings } = this.state;

    return (
      <HashRouter>
        <Route
          render={({ location }) => (
            <Nav
              path={location.pathname}
              products={products}
              companies={companies}
            />
          )}
        />
        <Switch>
          <Route
            path="/products"
            render={() => (
              <Products
                products={products}
                offerings={offerings}
                companies={companies}
              />
            )}
          />
          <Route
            path="/companies"
            render={() => (
              <Companies
                products={products}
                offerings={offerings}
                companies={companies}
              />
            )}
          />
          <Redirect to="/companies" />
        </Switch>
      </HashRouter>
    );
  }
}

render(<App />, root);
