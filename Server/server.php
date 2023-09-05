<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Origin: http://192.168.1.100:19006"); 
header("Cache-Control: no-cache, must-revalidate"); 
header("Content-Type: application/json");

// Function to read user data from a JSON file
function readUserData() {
    $data = file_get_contents('users.json');
    return json_decode($data, true);
}

// Function to write user data to a JSON file
function writeUserData($data) {
    file_put_contents('users.json', json_encode($data));
}

// Initialize the user data array by reading from the JSON file
$usersData = readUserData();

// Check the HTTP request method

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST request 
    $postData = json_decode(file_get_contents("php://input"), true);
    if (isset($postData['action'])) {
        if (isset($postData['action']) && $postData['action'] === 'add') {
            // Handle adding a new user
            $newUser = $postData['user'];
            $newUser['id'] = count($usersData) + 1; // Generate a new ID 
            array_push($usersData, $newUser);
            writeUserData($usersData); // Write the updated data back to the JSON file
            echo json_encode(array("message" => "User added successfully", "users" => $usersData));

        } elseif ($postData['action'] === 'login') {
            // Handle login

            $inputEmail = $postData['email'];
            $inputPassword = $postData['password'];

            // Check if email and password match (adjust this logic)
            $expectedEmail = 'Alon@mly.com';
            $expectedPassword = '1234';

            if ($inputEmail === $expectedEmail && $inputPassword === $expectedPassword) {
                echo json_encode(array("message" => "Login successful"));
            } else {
                echo json_encode(array("message" => "Incorrect email or password"));
            }
        } else {
            echo json_encode(array("message" => "Invalid action"));
        }
    } else {
        echo json_encode(array("message" => "Missing action"));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request
    $req = $_GET['req'];

    if ($req === 'contacts') {
        if ($usersData !== null) {
            echo json_encode($usersData);
        } else {
            echo json_encode(array("message" => "Error fetching user data"));
        }
    } else {
        echo json_encode(array("message" => "User not found"));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Handle PUT request 
    $putData = json_decode(file_get_contents("php://input"), true);

    if (isset($putData['action']) && $putData['action'] === 'edit') {
        // Handle editing an existing user
        $editUserId = $putData['user']['id'];

        // Find the user by ID
        foreach ($usersData as $index => $user) {
            if ($user['id'] == $editUserId) {
                $usersData[$index] = $putData['user']; // Update user data
                writeUserData($usersData); // Write the updated data back to the JSON file
                echo json_encode(array("message" => "User edited successfully", "user" => $putData['user'], "users" => $usersData));
                break;
            }
        }
    } else {
        echo json_encode(array("message" => "Invalid action"));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Handle DELETE request
    $userIdToDelete = $_GET['id']; // Get the user ID from the query string

    if (!empty($userIdToDelete)) {
        // Use array_filter to remove the user with the specified ID
        $filteredData = array_filter($usersData, function ($user) use ($userIdToDelete) {
            return $user['id'] != $userIdToDelete;
        });

        if (count($filteredData) < count($usersData)) {
            // User was deleted
            // Update $usersData with the filtered data
            $usersData = array_values($filteredData);

            // Write the updated user data back to the JSON file
            writeUserData($usersData);

            // Respond with the updated user list as an array
            $response = array_values($filteredData);
            echo json_encode($response);
        } else {
            // User not found
            http_response_code(404);
            echo json_encode(array("message" => "User not found"));
        }
    } else {
        // Missing user ID
        http_response_code(400);
        echo json_encode(array("message" => "Missing user ID"));
    }
}
 elseif ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle OPTIONS request (for CORS checks)
    http_response_code(200);
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Method Not Allowed"));
}
?>
