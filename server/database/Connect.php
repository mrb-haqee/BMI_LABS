<?php
// Konfigurasi koneksi database
$host = 'localhost'; // Ganti dengan host database Anda
$database = 'bmilabs'; // Ganti dengan nama database Anda
$username = 'root'; // Ganti dengan username database Anda
$password = 'mrb28'; // Ganti dengan password database Anda

try {
    // Buat koneksi PDO
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);

    // Atur mode error PDO ke exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Koneksi database gagal: " . $e->getMessage());
}


