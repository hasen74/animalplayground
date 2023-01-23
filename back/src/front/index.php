<!DOCTYPE HTML>
<html>

<head>
  <link rel="stylesheet" href="./style.css">
  <meta charset="utf-8">
  <title>Animal Playground: more toys, more joy!</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="./scripts/script.js"></script>
  <script src="./scripts/auth.js"></script>

</head>

<body>
  <div class="container">
    <div class="login">
      <div id="loginForm">
        <label for="log_email">Email:</label><br>
        <input type="text" name="log_email" id="log_email" /><br>
        <label for="log_pass">Password:</label><br>
        <input type="password" name="log_pass" id="log_pass" /><br>
        <button onclick="sendJSONdata()">Send</button>
      </div>
      <div id="success" style="display:none; font-weight:bold">
        Authentification successful!
      </div>
      <div id="admin" style="display:none; font-weight:bold; color:red">
        ADMIN MODE
      </div>
      <div id="user" style="display:none; font-weight:bold; color:red">
        USER MODE
      </div>
    </div>
    <p class="header">Animal Playground Database Manager</p>
    <div class="main">
      <form target="_blank" id="adminform" method="post" action="./scripts/traitement.php">
        <p><label for="action">Action:</label>
          <select name="action" id="action">
            <option value="blank">-----</option>
            <option value="get">Show</option>
            <option value="add">Add</option>
            <option value="put">Update</option>
            <option value="delete">Delete</option>
          </select>
        </p>
        <fieldset class="selection">
          <div>
            <input type="radio" id="default" name="table" checked style="visibility:hidden">
            <label for="users">Select a table:</label>
          </div>
          <div>
            <input type="radio" id="users" name="table" value="Users">
            <label for="users">Users</label>
          </div>
          <div>
            <input type="radio" id="products" name="table" value="Products">
            <label for="products">Products</label>
          </div>
          <div>
            <input type="radio" id="categories" name="table" value="Categories">
            <label for="categories">Categories</label>
          </div>
          <div>
            <input type="radio" id="orders" name="table" value="Orders">
            <label for="orders">Orders</label>
          </div>
          <div>
            <input type="radio" id="orderProducts" name="table" value="Orderproducts">
            <label for="orderProducts">Order_Products</label>
          </div>
        </fieldset>
        <div id="id" style="display:none" class="IDs">
          <label for="id">ID: </label><input type="text" name="id" id="id" maxlength="3" size="3" /><br>
        </div>
        <div id="orderId" style="display:none" class="IDs">
          <label for="orderId">OrderID: </label><input type="text" name="orderId" id="orderId" maxlength="3" size="3" /><br>
        </div>
        <div id="productId" style="display:none" class="IDs">
          <label for="productId">ProductID: </label><input type="text" name="productId" id="productId" maxlength="3" size="3" /><br>
        </div>
        <div id="categoryId" style="display:none" class="IDs" name="categoryId">
          <label for="categoryId">CategoryID: </label><input type="text" name="categoryId" id="categoryId" maxlength="3" size="3" /><br>
        </div>
        <div id="userId" style="display:none" class="IDs" name="userId">
          <label for="userId">UserID: </label><input type="text" name="userId" id="userId" maxlength="3" size="3" /><br>
        </div>
        <div class="user" style="display:none">
          <label for="first_name">First name:</label><input type="text" name="first_name" id="first_name" /><br>
          <label for="last_name">Last name:</label><input type="text" name="last_name" id="last_name" /><br>
          <label for="email">E-mail:</label><input type="text" name="email" id="email" /><br>
          <label for="address">Address:</label><input type="text" name="address" id="address" /><br>
          <label for="phone">Phone number:</label><input type="text" name="phone" id="phone" /><br>
          <label for="password">Password:</label><input type="text" name="password" id="password" /><br>
          <label for="role">Role:</label>
          <select name="role" id="role">
          <option value="0">User</option>
          <option value="1">Admin</option>
          </select>
        </div>
        <div class="product" style="display:none">
          <label for="name">Product name:</label><input type="text" name="name" id="name" /><br>
          <label for="description">Description:</label><input type="textarea" name="description" id="description" rows="5" cols="20" /><br>
          <label for="price">Price:</label><input type="text" name="price" id="price" /><br>
        </div>
        <div class="category" style="display:none">
          <label for="animal">Animal:</label><input type="text" name="animal" id="animal" /><br>
        </div>
        <div class="order" style="display:none">
          <label for="total_price">Total price:</label><input type="text" name="total_price" id="total_price" /><br>
          <label for="order_date">Order date:</label><input type="date" name="order_date" id="order_date" placeholder="yyyy-mm-dd" /><br>
          <label for="delivery_date">Delivery date:</label><input type="date" name="delivery_date" id="delivery_date" placeholder="yyyy-mm-dd" />
        </div>
        <div class="orderProduct" style="display:none">
          <label for="quantity">Quantity:</label><input type="text" name="quantity" id="quantity" /><br>
        </div>
        <input type="hidden" name="jwt" id="jwt" value="">
        <input type="submit" onclick="getToken()" value="Send" />
      </form>
    </div>
    <div class="footer">
      PROTOTYPE WEBSITE BY L.BOUVIER & B.SOLANO
    </div>
  </div>

  <body>

</html>