import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Insert Product</h1>

      <div className="form__wrapper">
        <form>
          <label for="product-name">Product Name:</label>
          <input type="text" id="product-name" name="product-name" maxLength="200" required/>

          <label for="product-description">Product Description:</label>
          <textarea id="product-description" name="product-description" maxLength="500" required></textarea>

          <label for="price">Price:</label>
          <input type="number" id="price" name="price" step="0.01" min="0" max="9999999.99" required/>

          <button type="submit">Submit</button>
        </form>
      </div>

    </div>
  );
}

export default App;
