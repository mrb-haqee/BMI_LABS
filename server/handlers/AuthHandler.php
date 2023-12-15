<?php

require_once(ROOT_DIR . '/database/Connect.php');
require_once(ROOT_DIR . '/helper/Helper.php');

// Define your handler functions in this file
function handleSignUp()
{
    global $pdo;

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $response = array('message' => 'Berhasil terhubung');

        // Convert the response to JSON and echo it
        echo json_encode($response);
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        try {
            // query mysql
            $sql = "INSERT INTO users (nama, email, password) VALUES (:nama, :email, :password)";
            $stmt = $pdo->prepare($sql);

            // Bind parameter ke pernyataan SQL
            $stmt->bindParam(':nama', $data["nama"]);
            $stmt->bindParam(':email', $data["email"]);
            $stmt->bindParam(':password', $data["password"]);

            // Mengeksekusi pernyataan SQL untuk menyimpan data
            $stmt->execute();

            http_response_code(201);

            // Membaca data yang baru saja disimpan
            $lastInsertId = $pdo->lastInsertId(); // ID yang baru saja disimpan

            // Mengambil data yang baru saja disimpan dari database (opsional)
            $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
            $stmt->bindParam(':id', $lastInsertId);
            $stmt->execute();
            $newData = $stmt->fetch(PDO::FETCH_ASSOC);

            Succes_resp("Sukses", "Data mahasiswa berhasil disimpan!", $newData);
        } catch (PDOException $e) {
            http_response_code(500);
            Error_resp("error", "Terjadi kesalahan: " . $e->getMessage());
        }
    } else {
        http_response_code(405);
        Error_resp("Error", " Method Not Allowed");
    }
}

function handleSignIn()
{
    global $pdo;

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $response = array('message' => 'Berhasil terhubung');

        // Convert the response to JSON and echo it
        echo json_encode($response);
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        try {
            // query mysql
            $sql = "SELECT * FROM users WHERE email = :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $data["email"]);
            $stmt->execute();

            $dataDB = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($data["password"] === $dataDB["password"]) {
                http_response_code(200);
                Succes_resp("Sukses", "Data mahasiswa berhasil disimpan!", $dataDB);
            } else {
                http_response_code(500);
                Error_resp("error", "Password Salah");
            }
        } catch (PDOException $e) {
            http_response_code(500);
            Error_resp("error", "Terjadi kesalahan: " . $e->getMessage());
        }
    } else {
        http_response_code(405);
        Error_resp("Error", " Method Not Allowed");
    }
}
