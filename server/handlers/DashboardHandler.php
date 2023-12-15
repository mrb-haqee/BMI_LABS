<?php

require_once(ROOT_DIR . '/database/Connect.php');
require_once(ROOT_DIR . '/helper/Helper.php');

// Define your handler functions in this file
function handleListDataPredict()
{
    global $pdo;

    if (isset($_GET["email"])) {
        $email = $_GET["email"];
        try {
            $sql = "SELECT * FROM predict WHERE email = :email ORDER BY id DESC";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([':email' => $email]);  // Menyertakan parameter dalam metode execute

            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            succes_resp("", "", $data);
        } catch (PDOException $e) {
            http_response_code(500);
            error_resp("error", $e->getMessage());
        }
    } else {
        error_resp("error", "Missing 'email' parameter in the request.");
    }
}

function handlePostDataPredict()
{
    global $pdo;

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);

        // Pastikan data telah berhasil di-decode
        if ($data === null) {
            echo json_encode(['status' => 'error', 'message' => 'Gagal mendekode JSON']);
            exit;
        }

        // Ambil nilai dari data JSON
        $user = $data['user'];
        $bmi = $data['bmi'];
        $prediction = $data['prediction'];
        $date = date('Y-m-d');

        try {
            $sql = "INSERT INTO predict (email, bmi, predict, date) VALUES (:user, :bmi, :prediction, :date)";

            // Siapkan dan jalankan statement menggunakan PDO
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':user' => $user,
                ':bmi' => $bmi,
                ':prediction' => $prediction,
                ':date' => $date,
            ]);


            $sql = "SELECT * FROM predict WHERE email = :email ORDER BY id DESC";
            $statement = $pdo->prepare($sql);
            $statement->execute([':email' => $user]);
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);

            // Kirim respons ke aplikasi React
            succes_resp(pesan: "Data berhasil di simpan", data: $data);
        } catch (PDOException $e) {
            // Tangani kesalahan koneksi atau query
            echo json_encode(['status' => 'error', 'message' => 'Kesalahan database: ' . $e->getMessage()]);
        }
    } else {
        // Tangani situasi jika data tidak dikirim melalui POST
        error_resp("error", "Method not allowed");
    }
}
