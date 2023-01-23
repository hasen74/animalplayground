<!DOCTYPE html>
<html>

<head>
  <title>Form process page</title>
  <meta charset="utf-8">
</head>

<body>
  <?php

  $action = $_POST["action"];
  $table = $_POST["table"];

  $first_name = $_POST["first_name"];
  $last_name = $_POST["last_name"];
  $email = $_POST["email"];
  $address = $_POST["address"];
  $phone = $_POST["phone"];
  $password = $_POST["password"];
  $role = $_POST["role"];

  $name = $_POST["name"];
  $description = $_POST["description"];
  $price = $_POST["price"];
  $category_id = $_POST["categoryId"];

  $user_id = $_POST["userId"];
  $order_date = $_POST["order_date"];
  $delivery_date = $_POST["delivery_date"];
  $total_price = $_POST["total_price"];

  $animal = $_POST["animal"];

  $productId = $_POST["productId"];
  $orderId = $_POST["orderId"];
  $quantity = $_POST["quantity"];

  $id = $_POST["id"];

  $categoryId = $_POST["categoryId"];
  $userId = $_POST["userId"];

  $pagetable = urlencode($table);
  $endpoint = 'http://localhost:3000/' . $pagetable;

  $token = $_POST["jwt"];
  $authorization = 'Authorization: Bearer ' . $token;

  switch ($action) {
    case 'get':
      #We look which id we must take as condition for SELECT
      if ($id) {
        $url = $endpoint . '/' . $id;
      } else if ($orderId && $productId) {
        $url = $endpoint . '/' . $orderId . '&' . $productId;
      } else if ($orderId) {
        $url = $endpoint . '/orderList/' . $orderId;
      } else if ($productId) {
        $url = $endpoint . '/productList/' . $productId;
      } else if ($categoryId) {
        $url = $endpoint . '/categoryList/' . $categoryId;
      } else if ($userId) {
        $url = $endpoint . '/userList/' . $userId;
      } else {
        $url = $endpoint;
      }

      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      break;

    case 'add':
      switch ($table) {
        case 'Users':
          $fields = [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'address' => $address,
            'phone' => $phone,
            'password' => $password,
            'role' => $role
          ];
          $endpoint = $endpoint . '/register/';
          break;
        case 'Products':
          $fields = [
            'name' => $name,
            'description' => $description,
            'price' => $price,
            'CategoryId' => $category_id
          ];
          break;
        case 'Orders':
          $fields = [
            'UserId' => $userId,
            'order_date' => $order_date,
            'delivery_date' => $delivery_date,
            'total_price' => $total_price
          ];
          break;
        case 'Categories':
          $fields = ['animal' => $animal];
          break;
        case 'Orderproducts':
          $fields = [
            'OrderId' => $orderId,
            'ProductId' => $productId,
            'quantity' => $total_price
          ];
          break;
      }

      $queryfields = http_build_query($fields);
      $url = $endpoint . '?' . $queryfields;

      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      break;

    case 'put':
      switch ($table) {
        case 'Users':
          $fields = [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'address' => $address,
            'phone' => $phone,
            'password' => $password,
            'role' => $role
          ];
          $queryfields = http_build_query($fields);
          $url = $endpoint . '/' . $id . '/?' . $queryfields;
          break;
        case 'Products':
          $fields = [
            'name' => $name,
            'description' => $description,
            'price' => $price,
            'CategoryId' => $category_id
          ];
          $queryfields = http_build_query($fields);
          $url = $endpoint . '/' . $id . '/?' . $queryfields;
          break;
        case 'Orders':  
          $fields = [
            'UserId' => $userId,
            'order_date' => $order_date,
            'delivery_date' => $delivery_date,
            'total_price' => $total_price
          ];
          $queryfields = http_build_query($fields);
          $url = $endpoint . '/' . $id . '/?' . $queryfields;
          break;
        case 'Categories':
          $fields = [ 'animal' => $animal ];
          $queryfields = http_build_query($fields);
          $url = $endpoint . '/' . $id . '/?' . $queryfields;
          break;
        case 'Orderproducts':
          $fields = [ 'quantity' => $quantity ];
          $queryfields = http_build_query($fields);
          $url = $endpoint . '/' . $orderId . '&' . $productId . '/?' . $queryfields;
          break;
      }

      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      break;

    case 'delete':
      if ($table === 'Orderproducts') {
        $url = $endpoint . '/' . $orderId . '&' . $productId;
      } else {
        $url = $endpoint . '/' . $id;
      }

      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


      break;
  }

  $data = curl_exec($ch);
  curl_close($ch);

  echo $data;
  ?>
</body>

</html>