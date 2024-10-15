const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]



const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

const App = () => {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>T-Shirts</h1>
      <TshirtGrid />
    </div>
  );
}

const TshirtGrid = () => {
  return (
      <div className="grid">
          {tshirts.map((tshirt, index) => (<Tshirt key={index} shirt={tshirt}/>))}
      </div>
  );
}

const Tshirt = ({ shirt }) => {
  const imagePath = `./images/${shirt.image}`;
  // states
  const [stock, setStock] = React.useState(shirt.stock);
  const [quantitySelected, setQuantitySelected] = React.useState(1);

  // Options
  const options = [];
  for (let i = 1; i <= stock; i++) {
      options.push(<option key={i} value={i}>{i} item(s)</option>);
  }

  // handlers
  const handleSelection = (e) => {
      setQuantitySelected(prevValue => {
          console.log(`Selected ${e.target.value} ${shirt.title}(s)`);
          return parseInt(e.target.value);
      });
  };
  
  const handleBuy = () => {
      if (quantitySelected > 0 && quantitySelected <= stock) {
          setStock((prevStock) => {
              const newStock = prevStock - quantitySelected;
              console.log(`${shirt.title}: purchased ${quantitySelected}. Remaining stock: ${newStock}`);
              return newStock;
          });
          setQuantitySelected(1);
      } else {
          window.alert("Invalid selection or insufficient stock");
      }
  };

  React.useEffect(() => {
      if (stock === 1 && quantitySelected === 0) {
          setQuantitySelected(1);
      }
  }, [stock]);

  return (
      <div id="Tshirt" style={{
          width: '250px',
          margin: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
      }}>
          <img src={imagePath} alt={shirt.image} style={{
            width: '250px',
            margin: '20px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}/>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{shirt.title}</h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>${shirt.price}</p>
          

          {stock > 0 ? 
          (<>
          <p style={{ fontSize: '14px', color: '#999', marginBottom: '10px' }}>{stock} left</p>
          <select
          value={quantitySelected}
          onChange={handleSelection}
          >
              {options}
          </select>
          <button onClick={handleBuy}
          style={{
              width: '100%',
              height: '40px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
          }}>
              Buy
          </button>
          </>
          ) : 
          (
          <p className="outofstock" style={{ fontSize: '14px', color: '#ff0000', marginTop: '20px' }}>Out of stock</p>
          )}
          
      </div>
  );
};



root.render(<App />);