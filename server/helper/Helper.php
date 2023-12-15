<?php

function get_data_by_ID($pdo, $id)
{
    $sql = "SELECT * FROM data_mahasiswa WHERE id = :id";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":id", $id);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function Succes_resp($status = "Sukses", $pesan = "", $data = null)
{
    echo json_encode(array("status" => $status, "pesan" => $pesan, "data" => $data));
}

function Error_resp($status, $pesan)
{
    echo json_encode(array("status" => $status, "pesan" => $pesan));
}
