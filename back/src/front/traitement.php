<!DOCTYPE html>
<html>

<head>
  <title>Page de traitement</title>
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
  $password = base64_encode($_POST["password"]);

  $name = $_POST["name"];
  $description = $_POST["description"];
  $price = $_POST["price"];
  $category_id = $_POST["category_id"];

  $user_id = $_POST["user_id"];
  $order_date = $_POST["order_date"];
  $delivery_date = $_POST["delivery_date"];
  $total_price = $_POST["total_price"];

  $animal = $_POST["animal"];

  $id = $_POST["id"];

  $pagetable = urlencode($table);
  $endpoint = 'http://localhost:3000/' . $pagetable;

  switch ($action) {
    case 'get':
      $url = $endpoint . '/' . $id;
      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
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
            'password' => $password
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
            'UserId' => $user_id,
            'order_date' => $order_date,
            'delivery_date' => $delivery_date,
            'total_price' => $total_price
          ];
          break;
        case 'Categories':
          $fields = ['animal' => $animal];
          break;
      }

      $queryfields = http_build_query($fields);
      $url = $endpoint . '?' . $queryfields;
      
      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_POST, true);
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
            'password' => $password
          ];
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
            'UserId' => $user_id,
            'order_date' => $order_date,
            'delivery_date' => $delivery_date,
            'total_price' => $total_price
          ];
          break;
        case 'Categories':
          $fields = ['animal' => $animal];
          break;
      }

      $queryfields = http_build_query($fields);
      $url = $endpoint . '/' . $id . '/?' . $queryfields;

      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      break;

    case 'delete':
      $url = $endpoint . '/' . $id;

      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      break;
    }

  $data = curl_exec($ch);
  curl_close($ch);

  echo $data;

  //$raw = file_get_contents($url);
  //echo "<u>" . $raw;
  ?>
</body>

</html>