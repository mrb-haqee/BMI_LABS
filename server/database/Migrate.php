<?php

require_once(__DIR__ . '/Connect.php');

try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )");
    echo "Tabel 'users' berhasil dibuat.";
} catch (PDOException $e) {
    echo "Error saat membuat tabel: " . $e->getMessage();
}

try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS predict (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        number INT NOT NULL,
        predict VARCHAR(20) NOT NULL,
        date DATE NOT NULL
    )");
    echo "Tabel 'predict' berhasil dibuat.";
} catch (PDOException $e) {
    echo "Error saat membuat tabel: " . $e->getMessage();
}

try {
    $data = [
        ['rafli@email', 30, 'obese', '2023-10-30'],
        ['rafli@email', 18, 'underweight', '2023-10-31'],
        ['rafli@email', 20, 'normal', '2023-11-01'],
        ['rafli@email', 24, 'overweight', '2023-11-02'],
        ['rafli@email', 35, 'obese', '2023-11-03'],
    ];

    // Loop untuk memasukkan data dummy
    foreach ($data as $item) {
        $email = $item[0];
        $number = $item[1];
        $predict = $item[2];
        $date = $item[3];

        $sql = "INSERT INTO predict (email, number, predict, date) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email, $number, $predict, $date]);
    }

    echo "Data dummy berhasil dimasukkan ke dalam tabel 'predict'.";
} catch (PDOException $e) {
    echo "Error saat memasukkan data dummy: " . $e->getMessage();
}
