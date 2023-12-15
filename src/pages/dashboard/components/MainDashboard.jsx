import React, { useState, useRef, useEffect } from "react";
import { TablePrediction } from "./TablePrediction";
import api from "../../../utils/Api";
import axios from "axios";
import { toast } from "react-toastify";

export default function MainDashboard({ dataPredict, user, setDataPredict }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setStream(stream);
        setIsCameraOn(true);
      })
      .catch((error) => {
        console.error("Gagal mengakses kamera: " + error);
      });
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/png");

    setCapturedImage(imageDataURL); // Simpan gambar yang diambil dalam state
    setUploadedImage(null);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl); // Atur URL gambar yang sama untuk kedua gambar
      setCapturedImage(null);
    }
  };

  const handleDeleteImageRequest = () => {
    setCapturedImage(null);
    setUploadedImage(null);
  };

  const handleGetPrediction = async () => {
    if (capturedImage || uploadedImage) {
      // Menampilkan notifikasi loading
      const loadingToastId = toast.loading("Mengunggah gambar...", {
        autoClose: false,
      });

      const formImage = new FormData();
      const fileName = `photo_${Date.now()}.jpg`;

      if (capturedImage) {
        const base64Data = capturedImage.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        const arrayBuffer = Uint8Array.from(atob(base64Data), (c) =>
          c.charCodeAt(0)
        );
        const blob = new Blob([arrayBuffer], { type: "image/png" });
        // console.log(blob);

        formImage.append("image", blob, fileName);
      } else {
        const response = await fetch(uploadedImage);
        const blobData = await response.blob();
        // console.log(blobData);

        // Membuat FormData dan menambahkan file dengan nama yang sudah ditentukan
        formImage.append("image", blobData, fileName);
      }

      try {
        const response = await axios.request({
          url: "http://localhost:5000/predict",
          method: "POST",
          data: formImage,
        });

        let dataPost = {
          user: user,
          bmi: response.data.bmi,
          prediction: response.data.prediction,
        };

        console.log(response.data.message);

        try {
          const respPost = await api.post("/api/v1/dashboard/post", dataPost);
          setDataPredict(respPost.data.data);
          setCapturedImage(null);
          setUploadedImage(null);

          toast.success(respPost.data.pesan);
          console.log("Berhasil menambahkan predict");
        } catch (e) {
          console.error("error database: ", e);
        }

        // Menutup notifikasi loading setelah berhasil
        toast.dismiss(loadingToastId);
      } catch (err) {
        let resp_err = err.response;
        console.error("Error uploading file:", resp_err);
        toast.dismiss(loadingToastId);
        toast.error(resp_err.data.error);
      }
    } else {
      console.error("Tidak ada gambar yang dipilih.");
    }
  };

  // console.log(dataPredict);
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">BMIPrediction</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="#">
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="take-image">
        <div className="upload-image">
          <form id="img-upload">
            <h3>Upload Foto</h3>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              id="file-input"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </form>
        </div>
        <div className="camera">
          <button
            onClick={toggleCamera}
            className={isCameraOn ? "c-off" : "c-on"}
          >
            {isCameraOn ? "Matikan Kamera" : "Hidupkan Kamera"}
          </button>
          <div className="camera-warp">
            <video ref={videoRef} autoPlay muted />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            {isCameraOn && (
              <button id="btn-foto" onClick={captureImage}>
                Ambil Foto
              </button>
            )}
          </div>
        </div>
      </div>
      <div id="request-redict">
        {capturedImage || uploadedImage ? (
          <>
            <img
              src={capturedImage ? capturedImage : uploadedImage}
              alt="Foto yang diambil"
            />
            <div>
              <button className="c-off" onClick={handleDeleteImageRequest}>
                Delete
              </button>
              <button className="send" onClick={handleGetPrediction}>
                GET PREDICTION
              </button>
            </div>
          </>
        ) : (
          <p>Tidak ada foto upload</p>
        )}
      </div>
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Tabel Prediction</h3>

            <input type="text" />
            <i className="bx bx-search" />
            {/* <i className="bx bx-filter" /> */}
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>BMI</th>
                <th>Prediction</th>
                <th>Date Prediction</th>
              </tr>
            </thead>
            <TablePrediction dataPredict={dataPredict} />
          </table>
          {!dataPredict || dataPredict.length === 0 ? (
            <div className="no-data">Tidak ada Data</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
